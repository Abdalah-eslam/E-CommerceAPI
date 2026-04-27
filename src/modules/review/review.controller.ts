import { reviewModel } from "../../models/review.model.js";
import type { Request , Response , NextFunction} from "express";
import AppErorr from "../../utils/AppError.js";
const createReview = async(req :Request , res:Response , next:NextFunction) => {
    req.body.user = (req as any).user.Id
    const  isExist = await reviewModel.findOne({user: req.body.user, product : req.body.product})
    if (isExist) return next(new AppErorr('you have already reviewed this product' , 409))
    const review = await reviewModel.create({...req.body})
    res.json({
        massage : "success",
        data : {review}
    })
}
const getReviews = async(req :Request , res:Response  , next:NextFunction) => {

    const review = await reviewModel.find()
    res.json({
        massage : "success",
        data : {review}
    })
}

const updateReview = async(req :Request , res:Response  , next:NextFunction) => {
    const review = await reviewModel.findByIdAndUpdate(req.params.id , req.body , {'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {review}
    })
}
const deleteReview = async(req :Request , res:Response  , next:NextFunction) => {

    const review = await reviewModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : {review}
    })
}

export default {createReview ,
    getReviews,
    updateReview,
    deleteReview,
    }