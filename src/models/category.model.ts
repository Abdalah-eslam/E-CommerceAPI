import mongoose  from "mongoose";

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

export const categoryModel = mongoose.model('category' , categorySchema)    
