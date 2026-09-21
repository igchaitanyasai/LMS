const express=require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv");
const courseRoute = require("./routes/courseRoutes");

const app=express()

dotenv.config()

app.get("/welcome",(req,res)=>{
    res.send("Welcome Back")
})

app.use("/api/course",courseRoute)

connectDB()

const PORT=3000
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});