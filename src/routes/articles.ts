import { Router } from "express";
import { articleController } from "../controllers/articles";

export const articleRouter = Router();

articleRouter.get("/", articleController.getArticles);
