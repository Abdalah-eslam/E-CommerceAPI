import mongoose from "mongoose";
import { Query } from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        minLength:2,
        maxLength:30
    },
    slug:{
        type:String,
        require:true,
        lowercase:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    }
},
{
    timestamps:true
})

subCategorySchema.pre(/^find/, function (this: Query<any, any>) {
    this.populate('category');
});

export const subCategoryModel = mongoose.model('subcategory' , subCategorySchema)