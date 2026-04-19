import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        minLength:2,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minLength:5
    },
    phone:{
        type:String,
        require:true,
    },
    profilePic: String,
    passChangedAt:Date,
    role:{
        type:String,
        enum:['user' , 'admin'],
        default:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    wishlist:[{
        type:mongoose.SchemaTypes.ObjectId , 
        ref:'product'
    }],
    addresses:[{
        city:String, 
        street:String,
        phone:String
    }]
},
{
    timestamps:true
})

userSchema.pre('save' ,async function () {

    const salt = await bcrypt.genSalt(10);
    this.password  = await bcrypt.hash(this.password as string , salt)
})



export const userModel = mongoose.model('user' , userSchema)