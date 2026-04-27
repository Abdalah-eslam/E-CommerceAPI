import type { Request , Response , NextFunction } from "express";
import { orderModel } from "../../models/order.model";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle";
import  AppError  from "../../utils/AppError";
import { cartModel } from "../../models/cart.model";
import { productModel } from "../../models/product.model";
import Stripe from 'stripe';
import { BASE_URL, STRIP_KEY } from "../../config/ENVconfig";
import { userModel } from "../../models/user.model";
const stripeClient =new Stripe(STRIP_KEY as string);

const CreateCashOder  = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const CardID = req.params.id;
        const session = await orderModel.startSession()
        session.startTransaction();
    try {
        const Cart = await cartModel.findOne({user : (req as any).user.Id}).populate('items.product').session(session)
    if (!Cart) return next(new AppError('cart not found',404));
    const bulkOps = Cart.items.map(item => ({
    updateOne: {
    filter: {
    _id: item.product,
    quantity: { $gte: item.quantity }
    },
    update: {
    $inc: { quantity: -item.quantity , sold : item.quantity}
    }
    }
}));

const totalPrice = Cart.priceAfterDiscount? Cart.priceAfterDiscount : Cart.totlePrice as number
const products = await productModel.bulkWrite(bulkOps, { session });
const  isExsit = await orderModel.findOne({user : (req as any).user.Id , Orderitems : Cart.items}).session(session)
if (isExsit) return next(new AppError('order already exist',404));
const order = await orderModel.create([{user : (req as any).user.Id,Orderitems : Cart.items
    , totalPrice : totalPrice , shippingAddress : req.body.shippingAddress , paymentMethod : "Cash"}], {session})
    res.json({massage : "success" , data : order})
    await cartModel.deleteOne({user : (req as any).user.Id , _id : CardID} , {session})
    await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        return next(new AppError('something went wrong',500));
        
    }
    finally {
        await session.endSession();
    }
});


const GetAllOrder = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    console.log((req as any).user.Id);
    
    const Result = await orderModel.aggregate([
        
    {
        $unwind : '$Orderitems'
    },
    {
        $lookup : {
        from : 'products',
        localField : 'Orderitems.product',
        foreignField : '_id',
        as : 'product'
        }
    },
    {
        $project : {
        Orderitems : 0
        }
    }
    ])
    res.json({massage : "success" , data : Result})
});

const GetUserOrder = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const Result = await orderModel.find({user : (req as any).user.Id})
    if (!Result) return next(new AppError('order not found',404));
    res.json({massage : "success" , data : Result})
});

const CreateSessionOrder = AsyncErrorHandle(async(req :Request , res:Response , next:NextFunction) => {
    const User = await userModel.findById((req as any).user.Id)
    const CardID = req.params.id
    const  Cart = await cartModel.findOne({user : (req as any).user.Id , _id : CardID}).populate('items.product')
    if (!Cart) return next(new AppError('cart not found',404));
    const Session = await stripeClient.checkout.sessions.create({
        line_items : [
            {
                price_data : {
                    currency : 'egp',
                    unit_amount : Cart.totlePrice as number * 100,
                    product_data : {
                        name : User?.name as any
                    },
                },
                quantity : 1
            }

        ],
        client_reference_id : req.params.id as any , 
        metadata : req.body.shippingAddress,
        mode : 'payment',
        success_url : BASE_URL as string,
        cancel_url : 'https://www.google.com.eg/index.html'
    })
    res.json({massage : "success" , data : Session})
}) 

export default { CreateCashOder , GetAllOrder , GetUserOrder , CreateSessionOrder}