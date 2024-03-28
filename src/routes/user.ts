import { Router } from "express";
import { userController } from "../controllers/user";

export const userRouter = Router();

userRouter.get("/get/:id?", userController.getUsers);
userRouter.post("/new", userController.createUser);
userRouter.put("/update/:id", userController.updateUser);
userRouter.put("/deactivate/:id", userController.softDeleteUser);
userRouter.delete("/delete/:id", userController.deleteUser);
