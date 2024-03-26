import { Router } from "express";
import { userController } from "../controllers/user";

export const userRouter = Router();

userRouter.get("/:id", userController.getUsers);
userRouter.post("/new", userController.createUser);
