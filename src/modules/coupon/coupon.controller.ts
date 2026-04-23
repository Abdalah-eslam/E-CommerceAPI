import { couponModel } from "../../models/coupon.model";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle";
import type { Request , Response , NextFunction} from "express";
import AppErorr from "../../utils/AppError";

const CreateCoupon = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const result = await couponModel.create(req.body)
    res.json({massage : "success" , data : result})
});
const GetCoupon = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const result = await couponModel.find().select(' -__v -discount')
    res.json({massage : "success" , data : result})
});
const DeleteCoupon = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const result = await couponModel.findByIdAndDelete(req.params.id)
    if (!result) next(new AppErorr('coupon not found',404));
    res.json({massage : "success" , data : result})
});

export default {CreateCoupon,
    GetCoupon,
    DeleteCoupon,
}