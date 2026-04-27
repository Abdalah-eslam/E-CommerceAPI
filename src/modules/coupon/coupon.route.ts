import { Router } from "express";
import CouponController from "./coupon.controller.js";
import { Protect } from "../../middlewares/Authprotect.js";
import { AllowTo } from "../../middlewares/allowTo.js";
const CouponRouter = Router();
CouponRouter.post("/",Protect,AllowTo('admin'),CouponController.CreateCoupon);
CouponRouter.get("/",Protect,AllowTo('user'),CouponController.GetCoupon);
CouponRouter.delete("/:id",Protect,AllowTo('admin'),CouponController.DeleteCoupon);
export default CouponRouter 