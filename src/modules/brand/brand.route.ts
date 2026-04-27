import { Router } from "express";
import brandController from "./brand.controller.js"
import { uploadSingle } from "../../middlewares/uploadPics.js";
import { Protect } from "../../middlewares/Authprotect.js";
import { AllowTo } from "../../middlewares/allowTo.js";

const BrandRouter = Router();
BrandRouter.use (Protect)
BrandRouter.get("/", brandController.getbrand );
BrandRouter.post("/",uploadSingle('logo' , 'brands') ,AllowTo('admin'),brandController.createbrand );
BrandRouter.put("/:id",uploadSingle('logo' , 'brands'),AllowTo('admin') ,brandController.updatebrand );
BrandRouter.delete("/:id",AllowTo('admin'),brandController.deletebrand );

export default BrandRouter
