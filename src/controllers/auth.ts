import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { collections } from "../database/database";
import { generateJWT } from "../helpers/generateJwt";

const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  try {
    const existsUser: any = await collections.users.findOne({ email: email });

    if (!existsUser)
      return res.status(404).json({
        message: "No existe usuario con este correo",
      });

    const validatePassword = bcrypt.compareSync(password, existsUser.password);

    if (!validatePassword)
      return res.status(400).json({
        message: "Correo o contraseña erróneos",
      });

    const token = await generateJWT(existsUser._id);

    return res.status(200).json({
      message: "Login exitoso",
      token,
      data: existsUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al iniciar sesión",
    });
  }
};

export const authController = {
  login,
};
