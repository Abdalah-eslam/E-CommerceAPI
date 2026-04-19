import { Router } from "express";
import productController from "./product.controller"
import { uploadMultiple } from "../../middlewares/uploadPics";
const ProductRouter = Router({mergeParams:true});
const uploads=[{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 4 }]

ProductRouter.get("/",productController.getProducts );
ProductRouter.post("/",uploadMultiple( uploads, 'products'),productController.CreateProduct );
ProductRouter.put("/:id",productController.updateProduct );
ProductRouter.delete("/:id",productController.deleteProduct );
export default ProductRouter