import jwt from "jsonwebtoken"

//generating token
export const generateToken = (userId , res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"4d"
    })
    // sending cookies
    res.cookie("jwt", token , {
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
        httpOnly: true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })
    return token;
}