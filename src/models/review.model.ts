import mongoose  from "mongoose";

const reviewSchema =new mongoose.Schema({
    comment : {type: String,
        require: true,
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    product : {
        type : mongoose.Types.ObjectId,
        ref : 'product'
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    }
}, {
    timestamps : true
})
reviewSchema.pre(/^find/, async function(this : mongoose.Query<any , any>) {
    this.populate('user', 'name');
})


export const reviewModel = mongoose.model('review' , reviewSchema)