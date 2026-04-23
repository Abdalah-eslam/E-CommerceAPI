import type { Request , Response , NextFunction } from "express";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle";
import { userModel } from "../../models/user.model";
const CreateWishlist = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
const result = await userModel.findByIdAndUpdate((req as any).user.Id , {$addToSet : {wishlist : req.params.id}} , {'returnDocument':'after'})
res.json({massage : "success" , Wishlist : result?.wishlist})
});

const GetWishlist = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
const result = await userModel.findById((req as any).user.Id).populate('wishlist')
res.json({massage : "success" , Wishlist : result?.wishlist})
});

const RemoveWishlist = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
const result = await userModel.findByIdAndUpdate((req as any).user.Id , {$pull : {wishlist : req.params.id}} , {'returnDocument':'after'})
res.json({massage : "success" , Wishlist : result?.wishlist})
})
export default {CreateWishlist,
    GetWishlist,
    RemoveWishlist

}


