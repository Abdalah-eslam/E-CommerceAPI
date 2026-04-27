import {Router} from "express"
import multer from "multer";
const upload = multer();
import reviewController from "./review.controller.js" 
import { Protect } from "../../middlewares/Authprotect.js"; 
const ReviewRouter = Router();
ReviewRouter.get("/", reviewController.getReviews);
ReviewRouter.post("/",Protect,upload.none(), reviewController.createReview);
ReviewRouter.put("/:id",Protect, upload.none(),reviewController.updateReview);
ReviewRouter.delete("/:id",Protect, reviewController.deleteReview);
export default ReviewRouter