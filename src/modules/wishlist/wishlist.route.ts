import { Router } from "express";
import wishlistController from "./wishlist.controller.js";
import { Protect } from "../../middlewares/Authprotect.js";
import { AllowTo } from "../../middlewares/allowTo.js";
const wishlistRouter= Router();
wishlistRouter.patch("/:id",Protect,AllowTo('user'),wishlistController.CreateWishlist)
wishlistRouter.get("/",Protect,AllowTo('user'),wishlistController.GetWishlist)
wishlistRouter.delete("/:id",Protect,AllowTo('user'),wishlistController.RemoveWishlist)
export default wishlistRouter