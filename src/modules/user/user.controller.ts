import type { NextFunction , Request , Response } from "express";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle";
import { userModel } from "../../models/user.model";
import AppErorr from "../../utils/AppError";
const GetUsers = AsyncErrorHandle(async (req: Request, res: Response , next:NextFunction) => {
    const users = await userModel.find()
    res.json({
        massage : "success",
        data : {users}
    })  
})
const GetUserByID    = AsyncErrorHandle(async (req: Request, res: Response , next:NextFunction) => {
    const user = await userModel.findById(req.params.id)
    if (!user) next(new AppErorr('user not found',404));
    res.json({
        massage : "success",
        data : {user}
    })  
})
const UpdateUser = AsyncErrorHandle(async (req: Request, res: Response , next:NextFunction) => {
    const user = await userModel.findByIdAndUpdate(req.params.id , req.body , {'returnDocument':'after'})
    if (!user) next(new AppErorr('user not found',404));
    res.json({
        massage : "success",
        data : {user}
    })  
})
const DeleteUser = AsyncErrorHandle(async (req: Request, res: Response , next:NextFunction) => {
    const user = await userModel.findByIdAndDelete((req as any).user.Id)
    if (!user) next(new AppErorr('user not found',404));
    res.json({
        massage : "success",
        data : {user}
    })  
})
export default {
    GetUsers,
    GetUserByID,
    UpdateUser,
    DeleteUser
}


