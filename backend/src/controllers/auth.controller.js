
import { generateToken } from "../lib/utilis.js"
import User from "../models/user.model.js"
import bcrypt from  "bcryptjs"


export const signup  = async (req ,res) => {

    
    const {fullName, email, password , nickName} = req.body

    try {
        //all fields are required
        if(!fullName || !email || !password || !nickName){
            res.status(400).json({message:"all fields are required"})
        }
        // pass length
        if (password.length < 6) {
            res.status(400).json({message:"min password length is 6"})
        }
        
        // checking already exists 
        const user = await User.findOne({email})
        if (user) {
             res.status(400).json({message:"user already exists"})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hasshedpass = await bcrypt.hash(password, salt)

       // new user
        const newUser = new User ({
               fullName,
               email,
               nickName,
               password:hasshedpass
        })
     // generate and send cookies
     if (newUser) {
        generateToken(newUser._id,res)
        await newUser.save()

        res.status(200).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            nickName:newUser.nickName,
            profilePic:newUser.profilePic
        })
     }
     else{
        res.status(400).json({message:"Invaild User data!"})
     }
     

    } catch (error) {
        console.log("Error in signup Controller", error.message);
        res.status(400).json({message:"Internal Server Error"})
    }
}

export const logout  = (req ,res) =>{
    res.send("this is logout")
}

export const login  = (req ,res) =>{
    res.send("this is login")
}