import { Router } from "express";
import { authController } from "../controllers/auth";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";

export const authRouter = Router();

authRouter.get(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("El correo no es válido")
      .notEmpty()
      .withMessage("Favor de añadir el email"),
    check("password")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
      .isString()
      .withMessage("La contraseña tiene que ser una cadena de texto"),
    validateFields,
  ],
  authController.login
);
