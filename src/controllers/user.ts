import { Request, Response } from "express";
import { dbConnection } from "../database/database";
import { objectResponse } from "../interfaces/objectResponse";
import { User } from "../interfaces/user";

const getUsers = async (req: Request, res: Response) => {
  const collection = await dbConnection.collection("Users");
  const { params, query } = req;

  try {
    const data = await collection.find(query).toArray();

    if (!data.length) {
      return res.status(200).json({
        message: "La colección está vacía",
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
  const collection = await dbConnection.collection<User>("Users");
  const { body } = req;

  try {
    const isUser = (body: User): body is User => !!body?.name;

    console.log(isUser(body));

    if (!isUser(body))
      return res.status(400).json({
        message: "Favor de ingresar los datos del usuario",
      });

    const newUserResult = await collection.insertOne(body);

    console.log(newUserResult);
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

export const userController = {
  getUsers,
  createUser,
};
