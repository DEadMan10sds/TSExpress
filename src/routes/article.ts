import { Router } from "express";
import { articleController } from "../controllers/article";
import { validateFields } from "../middlewares/validateFields";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validateJWT";

export const articleRouter = Router();

articleRouter.get(
  "/:id?",
  [
    check("id")
      .optional()
      .isMongoId()
      .withMessage("El id no es un id de mongo válido"),
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
    check("imgURL")
      .isURL()
      .withMessage("La imagen tiene que ser una URL")
      .optional(),
    validateJWT,
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
    check("title")
      .withMessage("El título es obligatorio")
      .isString()
      .withMessage("El título tiene que ser un string")
      .optional(),
    check("content")
      .withMessage("El contenido del artículo es obligatorio")
      .isString()
      .withMessage("El contenido tiene que ser texto")
      .optional(),
    check("imgURL")
      .isURL()
      .withMessage("La imagen tiene que ser una URL")
      .optional(),
    validateJWT,
    validateFields,
  ],
  articleController.createArticle
);

articleRouter.put(
  "/soft/:id",
  [
    check("id")
      .notEmpty()
      .withMessage("El id es obligatorio")
      .isMongoId()
      .withMessage("El id no es un id de mongo válido"),
    validateJWT,
    validateFields,
  ],
  articleController.softDeleteArticle
);

articleRouter.delete(
  "/delete/:id",
  [
    check("id")
      .notEmpty()
      .withMessage("El id es obligatorio")
      .isMongoId()
      .withMessage("El id no es un id de mongo válido"),
    validateJWT,
    validateFields,
  ],
  articleController.deleteArticle
);
