const mongoose=require("mongoose")

async function connectDB(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected successfully");
}

module.exports=connectDB


//2311cs010109_db_user
//06wSgxzrn6wy4HY4