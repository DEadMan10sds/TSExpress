import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { SECRET_KEY } from "../config/config";
import { collections } from "../database/database";

export async function validateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("x-Token");
  if (!token) return res.status(401).redirect("/");

  try {
    const { uid } = jsonwebtoken.verify(token, SECRET_KEY) as JwtPayload;
    let id = new ObjectId(String(uid));

    const existsUser: any = await collections.users.findOne({
      _id: id,
    });

    if (!existsUser || !existsUser.active)
      return res.status(400).json({
        message: "El usuario no está autorizado",
      });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }

  next();
}
