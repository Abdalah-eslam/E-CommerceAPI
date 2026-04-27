import { Router } from "express";
import {createCategory, deleteCategory, getCategories, updateCategory} from "./category.controller.js"
import SubcategoryRouter from "../subcategory/subcategory.route.js";
import { Protect } from "../../middlewares/Authprotect.js";
import { uploadSingle } from "../../middlewares/uploadPics.js";
import { AllowTo } from "../../middlewares/allowTo.js";

const CategoryRouter = Router();
CategoryRouter.use("/:CategoryId/subcategory", SubcategoryRouter)
CategoryRouter.get("/", getCategories );
CategoryRouter.post("/",Protect,AllowTo('admin'),uploadSingle('img' , 'Category') ,createCategory );
CategoryRouter.put("/:id",Protect,AllowTo('admin'),uploadSingle('img' , 'Category'), updateCategory );
CategoryRouter.delete("/:id",Protect,AllowTo('admin'),deleteCategory );

export default CategoryRouter