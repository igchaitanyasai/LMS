const express=require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv");
const courseRoute = require("./routes/courseRoutes");
const authRoute=require("./routes/authRoutes")
const app=express()


app.use(express.json())
dotenv.config()



app.get("/welcome",(req,res)=>{
    res.send("Welcome Back")
})

app.use("/api/course",courseRoute)
app.use("/api/auth",authRoute)

connectDB()

const PORT=3000
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});