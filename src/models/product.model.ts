import mongoose from "mongoose";
import { BASE_URL } from "../config/ENVconfig";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        minLength:3
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    priceAfterDiscount:{
        type:Number,
        min:0
    },
    ratingAvg:{
        type:Number,
        min:1,
        max:5
    },
    ratingCount:{
        type:Number,
        min:0,
        default:0
    },
    description:{
        type:String,
        required:true,
        minLength:10,
        maxLength:300,
        trim:true
    },
    quantity:{
        type:Number,
        require:true,
        min:0,
        default:0
    },
    sold:{
        type:Number,
        default:0,
        min:0
    },
    imgCover:String,
    images:[String],
    category:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'category'
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'subcategory'
    },
    brand:{
        type:String,
        required:true,
        ref:'brand'
    }
},
{
    timestamps:true,
    
})

productSchema.index({title:'text' , description:'text'})
productSchema.post('init' , (doc )=>{
    doc.imgCover =`${BASE_URL}/products/${doc.imgCover}`
    doc.images = doc.images.map((img:string )=>`${BASE_URL}/products/${img}`)
})



export const productModel = mongoose.model('product' , productSchema)
