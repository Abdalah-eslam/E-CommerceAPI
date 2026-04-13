import { Router } from "express";
import {createSubCategory, deleteSubCategory, getSubCategories, updateSubCategory} from "./subcategory.controller"
import { create } from "node:domain";

const SubcategoryRouter = Router();

SubcategoryRouter.get("/", getSubCategories );
SubcategoryRouter.post("/", createSubCategory );
SubcategoryRouter.put("/:id", updateSubCategory );
SubcategoryRouter.delete("/:id", deleteSubCategory );

export default SubcategoryRouter