import mongoose  from "mongoose";
import { BASE_URL } from "../config/ENVconfig";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img:{
        type:String,
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    }
},
{
    timestamps:true
})
categorySchema.post('init' , (doc )=>{
    doc.img =`${BASE_URL}/Category/${doc.img}`
})

export const categoryModel = mongoose.model('category' , categorySchema)    
