function getCourse(req,res){

}

function createCourse(req,res){

}



function deleteCourse(req,res){

}



function updateCourse(req,res){

}

function getCourseById(req,res){

}
module.exports={
    getCourse,createCourse,deleteCourse,updateCourse,getCourseById
}


// const{name,email,password,role}=req.body

//     if(!name || !email || !password || !role){
//         return res.status(400).json({
//             "message":"Invalid Input"
//         })
//     }

//     const existingUser=await User.findOne({email:email})

//     if(existingUser){
//         return res.status(400).json({
//             message:"User is already registered"
//         })
//     }
//     const encryptPassword=await bcrypt.hash(String(password),4)
//     const newUser=await User.create({
//         name:name,
//         email:email,
//         password:encryptPassword,
//         role:role
//     })

//     res.status(200).json({
//         "message":"User registred successfully"
//     })