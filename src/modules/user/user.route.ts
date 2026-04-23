import { Router } from "express";
import userController from "./user.controller";
import { Protect } from "../../middlewares/Authprotect";

const UserRouter = Router();
UserRouter.get("/", userController.GetUsers);
UserRouter.get("/:id", userController.GetUserByID);
UserRouter.put("/:id", userController.UpdateUser);
UserRouter.delete("/:id",Protect ,userController.DeleteUser);
export default UserRouter;
