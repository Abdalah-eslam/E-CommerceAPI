import type { Request , Response , NextFunction} from "express";
import  {cartModel}  from "../../models/cart.model";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle";
import AppError from "../../utils/AppError";
import { productModel } from "../../models/product.model";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export const GetCart = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const result = await cartModel.find()
    res.json({massage : "success" , data : result})
});

export const DeleteCart = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const result = await cartModel.findByIdAndDelete(req.params.id)
    if (!result) next(new AppError('cart not found',404));
    res.json({massage : "success" , data : result})
});

export const CreateCart = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const product = await productModel.findById( req.body.product)
    if (!product) return next(new AppError('product not found',404));
    const isExist = await cartModel.findOne({user : (req as any).user.Id})
    if (!isExist) {
    const result = new cartModel(
    {
        user : (req as any).user.Id,
        items : [
            {
                product : req.body.product,
                price : product?.price
            }
        ]
    })
    result.totlePrice = calcTotalPrice(result.items)
    await result.save()
    return res.json({massage : "success" , data : result})
}   const item = isExist.items.find((item :any) => item.product.toString() === req.body.product)
if (item) {
    item.quantity++

} else {
    isExist.items.push({
        product : req.body.product,
        price : product?.price
    })}

    isExist.totlePrice = calcTotalPrice(isExist.items)
    await isExist.save()
    res.json({massage : "success" , data : isExist})
}
);

export default {GetCart , DeleteCart , CreateCart}
