import mongoose from "mongoose"

export const connectDB = async () => {
    try {
       const conn =  await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connected to MONGODB :${conn.connection.host}`);
         
        } catch (error) {
        console.log("connection failed", error);
        
     }
}