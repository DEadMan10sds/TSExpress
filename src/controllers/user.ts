import { Request, Response } from "express";
import { dbConnection } from "../database/database";
import { objectResponse } from "../interfaces/objectResponse";
import { User } from "../interfaces/user";
import { ObjectId } from "mongodb";

const getUsers = async (req: Request, res: Response) => {
  const collection = dbConnection.collection("Users");
  const { params, query } = req;

  try {
    let data;

    data = !params.id
      ? await collection.find(query).toArray()
      : await collection.findOne({ _id: new ObjectId(params.id) });

    if (data?.length === 0 || !data) {
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
  const collection = dbConnection.collection("Users");

  try {
    const isUser = (body: User): body is User => !!body?.name;

    // console.log(isUser(body));

    if (!isUser(body))
      return res.status(400).json({
        message: "Favor de ingresar los datos del usuario",
      });

    const newUserResult = await collection.insertOne(body);

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
  const collection = dbConnection.collection("Users");

  try {
    const updatedUser = await collection.findOneAndUpdate({ id }, { ...data });
    console.log(updatedUser);

    return res.status(200).json({
      message: "Usuario encontrado",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar el usuario",
    });
  }
};

export const userController = {
  getUsers,
  createUser,
  updateUser,
};
