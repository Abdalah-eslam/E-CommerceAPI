import { Router } from "express";
import cartController from "./cart.controller";
import { Protect } from "../../middlewares/Authprotect";
import { AllowTo } from "../../middlewares/allowTo";
const CartRouter = Router();
CartRouter.get("/",Protect,AllowTo('user'),cartController.GetCart);
CartRouter.post("/",Protect,AllowTo('user'),cartController.CreateCart);
CartRouter.delete("/:id",Protect,AllowTo('user'),cartController.DeleteCart);
export default CartRouter