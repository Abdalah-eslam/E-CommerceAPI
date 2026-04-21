import { Router } from "express";
import brandController from "./brand.controller"
import { uploadSingle } from "../../middlewares/uploadPics";
import { Protect } from "../../middlewares/Authprotect";

const BrandRouter = Router();
BrandRouter.use (Protect)
BrandRouter.get("/", brandController.getbrand );
BrandRouter.post("/",uploadSingle('logo' , 'brands') ,brandController.createbrand );
BrandRouter.put("/:id", brandController.updatebrand );
BrandRouter.delete("/:id",brandController.deletebrand );

export default BrandRouter
