import { Router } from "express";
import { articleController } from "../controllers/article";

export const articleRouter = Router();

articleRouter.get("/:id?", articleController.getArticles);
articleRouter.post("/new", articleController.createArticle);
articleRouter.put("/update/:id", articleController.createArticle);
articleRouter.put("/soft/:id", articleController.softDeleteArticle);
articleRouter.delete("/delete/:id", articleController.deleteArticle);
