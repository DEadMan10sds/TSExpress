import { Router } from "express";
import { userController } from "../controllers/user";

export const userRouter = Router();

userRouter.get("/get/:id?", userController.getUsers);
userRouter.post("/new", userController.createUser);
userRouter.put("/update/:id", userController.updateUser);
