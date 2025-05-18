// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         email:{
//             type:String,
//             required:true,
//             unique:true
//         },
//         fullName:{
//             type:String,
//             required:true
//         },
//         password:{
//             type:String,
//             required:true,
//             minlength:6
//         },
//         profilePic:{
//             default:"",
//             required:true,
            
//         },

//     },{timestamps:true}
// )

// const User = mongoose.model("User", userSchema)

// export default User

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
   {
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String,
        default:true
        
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }

   },{timestamp:true})

   const User = mongoose.model("User", userSchema)

   export default User
