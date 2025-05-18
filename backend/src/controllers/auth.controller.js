
import { generateToken } from "../lib/utilis.js"
import User from "../models/user.model.js"
import bcrypt from  "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


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

export const login  =  async(req ,res) => {
    const {email, password} = req.body
   try {
    //checking email in db
    const user = await User.findOne({email})
    if(!user){
        res.status(400).json({message:"Invalid Credentials"})
    }
    // checking and comapairing
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        res.status(400).json({message:"Invalid Credentials"})
    }
    //gentoken
    generateToken(user._id, res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            nickName:user.nickName,
            profilePic:user.profilePic,
            message:"login in successfully"
        })
   } catch (error) {
    console.log("Error in login Controller");
    res.status(500).json({message:"Internal server error"})
   }
}

export const logout  = (req ,res) =>{
    try {
        
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logout Succsesfully"})

    } catch (error) {
        
    console.log("Error in login Controller");
    res.status(500).json({message:"Internal server error"})
    }

}

export const profileUpdate = async (req, res) =>{
    try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};