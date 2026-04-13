import { Router } from "express";
import {createCategory, deleteCategory, getCategories, updateCategory} from "./category.controller"
import { create } from "node:domain";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories );
CategoryRouter.post("/", createCategory );
CategoryRouter.put("/:id", updateCategory );
CategoryRouter.delete("/:id", deleteCategory );

export default CategoryRouter