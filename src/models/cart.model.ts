import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    items : [
        {
            product : {
                type : mongoose.Types.ObjectId,
                ref : 'product'
            },
            quantity : {
                type : Number,
                default : 1
            },
            price : {
                type : Number,
                required : true
            }
        }
    ],
    totlePrice : {
        type : Number,
    },
    priceAfterDiscount : {
        type : Number,
    },
    discount : {
        type : Number,
    }},
{
    timestamps : true   
},
)
export const cartModel = mongoose.model('cart' , cartSchema)