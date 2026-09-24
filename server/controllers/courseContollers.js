const Course = require('../models/courseModel')
async function getCourse(req,res){
    try{
        const courses=await Course.find()
        return res.status(200).send(courses)
    }
    catch(error){
        return res.status(500).send({
            message:"Unable to access course"
        })
    }
}

async function createCourse(req,res){
    try{
        const {title,description,category,level,price,duration}=req.body
        if(!title || !description || !category || !level || price==undefined || !duration){
            return res.status(400).send({
                message: "Bad Request"
            })
        }

        const existingCourse=await Course.findOne({title:title})

        if(existingCourse){
            return res.status(400).send({
                message: "Bad Request, Course already exists"
            })
        }

        const course=new Course({
            title:title,
            description:description,
            instructor: req.user._id,
            category: category,
            level: level,
            price: price,
            duration: duration,
        })
        await course.save()
        return res.status(200).send({
            message: "New course created"
        })

    }
    catch(error){
        return res.status(500).send({
            message:"Unable to create course"
        })
    }
}

async function deleteCourse(req,res){
    try{
        const {id}=req.params

        const course=await Course.findById(id)
        if(!course){
            return res.status(404).send({
                message : "Course not found"
            })
        }
        if(req.user.role!=="instructor" && (!course.instructor || !course.instructor.equals(req.user._id))){
            return res.status(403).send({
                message : "You can only delete courses you created."
            })
        }
        await course.deleteOne({_id:id})

        return res.status(200).send({
            message : "Course deleted"
        })
    }
    catch(error){
        console.log("Delete course error:", error);

        return res.status(500).send({
            message: "Unable to delete course",
            error: error.message
        });
    }
}

async function updateCourse(req,res){
    try{
        const {id}=req.params

        const course=await Course.findById(id)
        if(!course){
            return res.status(404).send({
                message : "Course not found"
            })
        }
        const editableFields=[
            "title",
            "description",
            "category",
            "level",
            "price",
            "duaration"
        ]
        editableFields.forEach((field)=>{
            if(req.body[field]!==undefined){
                course[field]=req.body[field]
            }
        })
        await course.save()
        return res.status(200).send({
            message : "Courrse Updated"
        })
    }
    catch(error){
        
    }
}

async function getCourseById(req,res){
    try{
        const {id} = req.params
        const course=await Course.findById(id).populate(
            "instructor",
            "name email role"
        )

        if(!course){
            return res.status(400).send({
                message : "Bad Request: Course not found"
            })
        }
        return res.status(200).send(course)
    }
    catch(error){
        console.log("hello")
    }
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