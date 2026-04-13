import mongoose  from "mongoose";

export const DBConnection = mongoose.connect(process.env.MONOGO_URL as string )
.then(() => console.log('DB connected'))
.catch((err) => console.log(err))