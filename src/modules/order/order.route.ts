import { Router } from "express";
import { Protect } from "../../middlewares/Authprotect";
import { AllowTo } from "../../middlewares/allowTo";
import orderController from "./order.controller";

const OrderRouter = Router();

OrderRouter.route("/:id")
.post(Protect , AllowTo("user") , orderController.CreateCashOder)

OrderRouter.route("/")
.get(Protect , AllowTo("user") , orderController.GetUserOrder)

OrderRouter.get("/All " , Protect , AllowTo("admin") , orderController.GetAllOrder)
export default OrderRouter