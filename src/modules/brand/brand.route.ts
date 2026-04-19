import { Router } from "express";
import brandController from "./brand.controller"
import { create } from "node:domain";
import { uploadSingle } from "../../middlewares/uploadPics";

const BrandRouter = Router();

BrandRouter.get("/", brandController.getbrand );
BrandRouter.post("/",uploadSingle('logo' , 'brands') ,brandController.createbrand );
BrandRouter.put("/:id", brandController.updatebrand );
BrandRouter.delete("/:id",brandController.deletebrand );

export default BrandRouter
