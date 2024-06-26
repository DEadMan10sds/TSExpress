import { Router } from "express";
import { articleController } from "../controllers/article";
import { validateFields } from "../middlewares/validateFields";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validateJWT";

export const articleRouter = Router();

articleRouter.get(
  "/get/:id?",
  [
    check("id").isMongoId().withMessage("El id no es un id válido").optional(),
    validateFields,
  ],
  articleController.getArticles
);

articleRouter.post(
  "/new",
  [
    check("title")
      .notEmpty()
      .withMessage("El título es obligatorio")
      .isString()
      .withMessage("El título tiene que ser un string"),
    check("content")
      .notEmpty()
      .withMessage("El contenido del artículo es obligatorio")
      .isString()
      .withMessage("El contenido tiene que ser texto"),
    check("imgURL", "La imagen tiene que ser una URL").isURL().optional(),
    check("x-Token").custom(validateJWT),
    validateFields,
  ],
  articleController.createArticle
);

articleRouter.put(
  "/update/:id",
  [
    check("id")
      .notEmpty()
      .withMessage("El id es obligatorio")
      .isMongoId()
      .withMessage("El id no es un id de mongo válido"),
    check("title", "El título tiene que ser un string").isString().optional(),
    check("content", "El contenido tiene que ser texto").isString().optional(),
    check("imgURL", "La imagen tiene que ser una URL").isURL().optional(),
    check("x-Token").custom(validateJWT),
    validateFields,
  ],
  articleController.updateArticle
);

articleRouter.put(
  "/deactivate/:id",
  [
    check("id")
      .notEmpty()
      .withMessage("El id es obligatorio")
      .isMongoId()
      .withMessage("El id no es un id de mongo válido"),
    check("x-Token").custom(validateJWT),
    validateFields,
  ],
  articleController.softDeleteArticle
);

articleRouter.delete(
  "/delete/:id",
  [
    check("x-Token").custom(validateJWT),
    check("id")
      .notEmpty()
      .withMessage("El id es obligatorio")
      .isMongoId()
      .withMessage("El id no es un id de mongo válido"),
    validateFields,
  ],
  articleController.deleteArticle
);
