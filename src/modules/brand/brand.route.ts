import { Router } from "express";
import brandController from "./brand.controller"
import { uploadSingle } from "../../middlewares/uploadPics";
import { Protect } from "../../middlewares/Authprotect";
import { AllowTo } from "../../middlewares/allowTo";

const BrandRouter = Router();
BrandRouter.use (Protect)
BrandRouter.get("/", brandController.getbrand );
BrandRouter.post("/",uploadSingle('logo' , 'brands') ,AllowTo('admin'),brandController.createbrand );
BrandRouter.put("/:id",uploadSingle('logo' , 'brands'),AllowTo('admin') ,brandController.updatebrand );
BrandRouter.delete("/:id",AllowTo('admin'),brandController.deletebrand );

export default BrandRouter
