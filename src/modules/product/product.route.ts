import { Router } from "express";
import productController from "./product.controller"
import { uploadMultiple } from "../../middlewares/uploadPics";
import { Protect } from "../../middlewares/Authprotect";
import { AllowTo } from "../../middlewares/allowTo";
const ProductRouter = Router({mergeParams:true});
const uploads=[{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 4 }]

ProductRouter.get("/",productController.getProducts );
ProductRouter.post("/",Protect,AllowTo('admin'),uploadMultiple( uploads, 'products'),productController.CreateProduct );
ProductRouter.put("/:id",Protect,AllowTo('admin'),uploadMultiple( uploads, 'products'),productController.updateProduct );
ProductRouter.delete("/:id",Protect,AllowTo('admin'),productController.deleteProduct );
export default ProductRouter