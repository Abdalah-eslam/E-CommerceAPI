import { Router } from "express";
import cartController from "./cart.controller";
import { Protect } from "../../middlewares/Authprotect";
import { AllowTo } from "../../middlewares/allowTo";
const CartRouter = Router();
CartRouter.get("/",Protect,AllowTo('user'),cartController.GetUserCart);
CartRouter.post("/",Protect,AllowTo('user'),cartController.CreateCart);
CartRouter.delete("/:id",Protect,AllowTo('user'),cartController.DeleteProductFromCart);
CartRouter.put("/:id",Protect,AllowTo('user'),cartController.updateQuantity);
CartRouter.post("/Coupon",Protect,AllowTo('user'),cartController.ApplyCoupon);
export default CartRouter