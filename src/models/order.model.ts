import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    Orderitems : [
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
        totalPrice: {
            type : Number,
            required : true
        },
        shippingAddress: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },

        paymentMethod: {
            type: String,
            enum: ['Cash', 'online'],
            required: true,
            default: 'Cash',
        },
    paymentStatus : {
        type : String,
        enum : ['pending' , 'paid' , 'failed'],
        default : 'pending'
    },
    isPaid : {
        type : Boolean,
        default : false
    },
    paidAt: Date,
    isDelivered : {
        type : Boolean,
        default : false
    },
    deliveredAt:   Date
},
{
    timestamps : true
})

export const orderModel = mongoose.model('order' , orderSchema)
