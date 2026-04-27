import type { Request , Response , NextFunction} from "express";
import  {cartModel}  from "../../models/cart.model";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle";
import AppError from "../../utils/AppError";
import { productModel } from "../../models/product.model";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { couponModel } from "../../models/coupon.model";

export const GetUserCart = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const result = await cartModel.find({user : (req as any).user.Id}).populate('items.product')
    res.json({massage : "success" , data : result})
});

export const DeleteProductFromCart = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const result = await cartModel.findOneAndUpdate({user : (req as any).user.Id}, {$pull : {items : {product : req.params.id}}} , {'returnDocument':'after'})
    if (result) {
    result.totlePrice = calcTotalPrice(result.items)
    await result.save()
    return res.json({massage : "success" , data : result})
    }
    else {
        return next(new AppError('product not found',404));
    }
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
}   const item = isExist.items.find((item :any) => item.product == req.body.product)
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
const updateQuantity = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const isExist = await cartModel.findOne({user : (req as any).user.Id})
    if (!isExist) return next(new AppError('cart not found',404));
    const item = isExist.items.find((item :any) => item.product == req.params.id)
    if (!item) return next(new AppError('item not found',404));
    item.quantity = req.body.quantity
    isExist.totlePrice = calcTotalPrice(isExist.items)
    await isExist.save()
    res.json({massage : "success" , data : isExist})
    
});

const ApplyCoupon = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const coupon  = await couponModel.findOne({code : req.body.code}) as any
    const isExist  = await cartModel.findOne({user : (req as any).user.Id}) as any
    if (isExist) {
    isExist.priceAfterDiscount = isExist.totlePrice - (isExist.totlePrice * (coupon.discount / 100))
    await isExist.save()
    res.json({massage : "success" , data : isExist})
    }
    else {
        return next(new AppError('cart not found',404));
    }
});

export default { GetUserCart , DeleteProductFromCart , CreateCart ,updateQuantity , ApplyCoupon}
