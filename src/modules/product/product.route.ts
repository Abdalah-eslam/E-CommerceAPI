import { Router } from "express";
import productController from "./product.controller.js"
import { uploadMultiple } from "../../middlewares/uploadPics.js";
import { Protect } from "../../middlewares/Authprotect.js";
import { AllowTo } from "../../middlewares/allowTo.js";
const ProductRouter = Router({mergeParams:true});
const uploads=[{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 4 }]

ProductRouter.get("/",productController.getProducts );
ProductRouter.post("/",Protect,AllowTo('admin'),uploadMultiple( uploads, 'products'),productController.CreateProduct );
ProductRouter.put("/:id",Protect,AllowTo('admin'),uploadMultiple( uploads, 'products'),productController.updateProduct );
ProductRouter.delete("/:id",Protect,AllowTo('admin'),productController.deleteProduct );
export default ProductRouter