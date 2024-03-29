import { Router } from "express";
import { userController } from "../controllers/user";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { validateJWT } from "../middlewares/validateJWT";

export const userRouter = Router();

userRouter.get(
  "/get/:id?",
  [
    check("id").isMongoId().withMessage("El id no es un id válido").optional(),
    validateJWT,
    validateFields,
  ],
  userController.getUsers
);

userRouter.post(
  "/new",
  [
    check("email")
      .isEmail()
      .withMessage("El correo no cumple las condiciones de un correo")
      .notEmpty()
      .withMessage("El correo es obligatorio"),
    /*check("password")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("La contraseña es débil"),*/
    check("name")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isString()
      .withMessage("El nombre tiene que ser una cadena de texto"),
    validateFields,
  ],
  userController.createUser
);

userRouter.put(
  "/update/:id",
  [
    check("id")
      .isMongoId()
      .withMessage("El id no es un id válido")
      .notEmpty()
      .withMessage("El id es obligatorio"),
    check("email")
      .isEmail()
      .withMessage("El correo no cumple las condiciones de un correo"),
    check("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("La contraseña es débil"),
    check("name")
      .isString()
      .withMessage("El nombre tiene que ser una cadena de texto"),
    validateJWT,
    validateFields,
  ],
  userController.updateUser
);

userRouter.put(
  "/deactivate/:id",
  [
    check("id")
      .isMongoId()
      .withMessage("El id no es un id válido")
      .notEmpty()
      .withMessage("El id es obligatorio"),
    validateJWT,
    validateFields,
  ],
  userController.softDeleteUser
);

userRouter.delete(
  "/delete/:id",
  [
    check("id")
      .isMongoId()
      .withMessage("El id no es un id válido")
      .notEmpty()
      .withMessage("El id es obligatorio"),
    validateJWT,
    validateFields,
  ],
  userController.deleteUser
);
