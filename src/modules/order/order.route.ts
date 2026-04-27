import { Router } from "express";
import { Protect } from "../../middlewares/Authprotect.js";
import { AllowTo } from "../../middlewares/allowTo.js";
import orderController from "./order.controller.js";

const OrderRouter = Router();

OrderRouter.route("/:id")
.post(Protect , AllowTo("user") , orderController.CreateCashOder)

OrderRouter.route("/")
.get(Protect , AllowTo("user") , orderController.GetUserOrder)

OrderRouter.get("/All " , Protect , AllowTo("admin") , orderController.GetAllOrder)
OrderRouter.post("/CheckOut/:id" , Protect , AllowTo("user") , orderController.CreateSessionOrder)
export default OrderRouter