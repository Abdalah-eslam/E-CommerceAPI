import { Router } from "express";
import authController from "./auth.controller";

const AuthRouter = Router();
AuthRouter.post("/register", authController.register);
AuthRouter.post("/login", authController.login);
AuthRouter.get("/logout", authController.logout);
export default AuthRouter;