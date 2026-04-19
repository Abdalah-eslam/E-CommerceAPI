import { Router } from "express";
import {createCategory, deleteCategory, getCategories, updateCategory} from "./category.controller"
import SubcategoryRouter from "../subcategory/subcategory.route";

const CategoryRouter = Router();
CategoryRouter.use("/:CategoryId/subcategory", SubcategoryRouter)
CategoryRouter.get("/", getCategories );
CategoryRouter.post("/", createCategory );
CategoryRouter.put("/:id", updateCategory );
CategoryRouter.delete("/:id", deleteCategory );

export default CategoryRouter