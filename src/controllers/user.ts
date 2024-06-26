import { Request, Response } from "express";
import { collections } from "../database/database";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { filterAttributes } from "../helpers/filterAttributes";
import { defaultQuery } from "../constants/defaultQuery";

const getUsers = async (req: Request, res: Response) => {
  let { limit = 5, start = 0, active, ...filters }: any = req.query,
    id;
  id = req.params.id !== undefined ? new ObjectId(req.params.id) : null;

  const { filteredAttributes, filteredQuery } = filterAttributes(filters);

  if (active !== undefined) defaultQuery.active = active;

  try {
    let data;

    data = !id
      ? await collections.users
          .find({ ...defaultQuery, ...filteredQuery })
          .skip(Number(start))
          .limit(Number(limit))
          .sort(filteredAttributes)
          .toArray()
      : await collections.users.findOne({ _id: id });

    if (!data || (Array.isArray(data) && data?.length === 0)) {
      return res.status(200).json({
        message: "No existen los datos buscados",
      });
    }

    return res.status(200).json({
      message: "Datos encontrados",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error en la consulta",
      error,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  body.active = true;

  try {
    if (body.password) {
      const salt = bcrypt.genSaltSync();
      body.password = bcrypt.hashSync(body.password, salt);
    }

    const newUserResult = await collections.users.insertOne(body);

    return res.status(200).json({
      message: "Usuario guardado correctamente",
      data: newUserResult,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error en la consulta",
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (data.password) {
      const salt = bcrypt.genSaltSync();
      data.password = bcrypt.hashSync(data.password, salt);
    }

    const updatedUser = await collections.users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: data,
      }
    );

    if (!updatedUser)
      return res.status(400).json({
        message: "El usuario no existe",
      });

    return res.status(200).json({
      message: "Usuario encontrado",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al actualizar el usuario",
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);

  try {
    const deletedUser = await collections.users.findOneAndDelete({ _id: id });

    if (!deletedUser)
      return res.status(400).json({
        message: "El usuario no existe",
      });

    return res.status(200).json({
      message: "Usuario eliminado",
      data: deletedUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error en la consulta",
      error,
    });
  }
};

const softDeleteUser = async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);

  try {
    const deactivateUser = await collections.users.findOneAndUpdate(
      { _id: id },
      { $set: { active: false } },
      { upsert: true }
    );

    if (!deactivateUser)
      return res.status(400).json({
        message: "El usuario no existe",
      });

    return res.status(200).json({
      message: "Usuario eliminado",
      data: deactivateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error en la consulta",
      error,
    });
  }
};

export const userController = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  softDeleteUser,
};
