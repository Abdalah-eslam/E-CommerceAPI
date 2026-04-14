import { Router } from "express";
import productController from "./product.controller"
const ProductRouter = Router();
ProductRouter.get("/",productController.getProducts );
ProductRouter.post("/",productController.CreateProduct );
ProductRouter.put("/:id",productController.updateProduct );
ProductRouter.delete("/:id",productController.deleteProduct );
export default ProductRouter