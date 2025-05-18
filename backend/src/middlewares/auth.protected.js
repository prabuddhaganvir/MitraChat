import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectedRoute = async (req,res,next) =>{
    const token = req.cookies.jwt

    try {
        if (!token) {
            res.status(401).json({message:"Unauthorized - User"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if (!decoded) {
            res.status(401).json({message:"Unauthorized - token"})
        }
    
        const user = await User.findById(decoded.userId).select("-password")
    
        if (!user) {
            res.status(401).json({message:"User - not found"})
        }
    
        req.user = user


        next();
    } catch (error) {
        console.log("Error in Protected Route middlware", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}