import { Router } from "express";
import userController from "./user.controller";

const UserRouter = Router();
UserRouter.get("/", userController.GetUsers);
UserRouter.get("/:id", userController.GetUserByID);
UserRouter.put("/:id", userController.UpdateUser);
UserRouter.delete("/:id", userController.DeleteUser);
export default UserRouter;
