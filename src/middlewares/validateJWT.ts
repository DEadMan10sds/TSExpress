import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { SECRET_KEY } from "../config/config";
import { collections } from "../database/database";

export async function validateJWT(value: any, { req }: any) {
  const token = req.header("x-Token");
  if (!token) throw new Error("El token de sesión es obligatorio");

  try {
    const { uid } = jsonwebtoken.verify(token, SECRET_KEY) as JwtPayload;
    const id = new ObjectId(String(uid));

    const existsUser: any = await collections.users.findOne({
      _id: id,
    });

    if (!existsUser || !existsUser.active) {
      throw new Error("El usuario no está autorizado");
    }
  } catch (error) {
    throw new Error("Token no válido");
  }
}
