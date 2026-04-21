import { Router } from "express";
import {createCategory, deleteCategory, getCategories, updateCategory} from "./category.controller"
import SubcategoryRouter from "../subcategory/subcategory.route";
import { Protect } from "../../middlewares/Authprotect";
import { uploadSingle } from "../../middlewares/uploadPics";
import { AllowTo } from "../../middlewares/allowTo";

const CategoryRouter = Router();
CategoryRouter.use("/:CategoryId/subcategory", SubcategoryRouter)
CategoryRouter.get("/", getCategories );
CategoryRouter.post("/",Protect,AllowTo('admin'),uploadSingle('img' , 'Category') ,createCategory );
CategoryRouter.put("/:id",Protect,AllowTo('admin'),uploadSingle('img' , 'Category'), updateCategory );
CategoryRouter.delete("/:id",Protect,AllowTo('admin'),deleteCategory );

export default CategoryRouter