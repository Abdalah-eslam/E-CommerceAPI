import { Router } from "express";
import {createSubCategory, deleteSubCategory, getSubCategories, updateSubCategory} from "./subcategory.controller.js"

import ProductRouter from "../product/product.route.js";

const SubcategoryRouter = Router({mergeParams:true});
SubcategoryRouter.use("/:SubcategoryId/product" , ProductRouter)
SubcategoryRouter.get("/", getSubCategories );
SubcategoryRouter.post("/", createSubCategory );
SubcategoryRouter.put("/:id", updateSubCategory );
SubcategoryRouter.delete("/:id", deleteSubCategory );

export default SubcategoryRouter