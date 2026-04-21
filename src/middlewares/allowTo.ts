import AppError from "../utils/AppError"

export const AllowTo = (...roles :string[]) => (req :any , res :any , next :any) => {
    if(!roles.includes(req.user.role)) return next(new AppError('you are not allowed to access this route',403))
        next()
}