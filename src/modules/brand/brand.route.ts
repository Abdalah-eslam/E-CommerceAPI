import { Router } from "express";
import brandController from "./brand.controller"
import { create } from "node:domain";

const BrandRouter = Router();

BrandRouter.get("/", brandController.getbrand );
BrandRouter.post("/", brandController.createbrand );
BrandRouter.put("/:id", brandController.updatebrand );
BrandRouter.delete("/:id",brandController.deletebrand );

export default BrandRouter
