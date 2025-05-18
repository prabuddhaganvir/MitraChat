 import express from "express"
 import authRoute from "./routes/auth.route.js"
 import dotenv from "dotenv"
 import { connectDB } from "./lib/db.js"
 import cookieParser from "cookie-parser"

 dotenv.config()
 const PORT = process.env.PORT
 const app = express()
 
  app.use(express.json())
  app.use(cookieParser())
  app.use("/api/auth", authRoute)

  app.listen(PORT, ()=>{
    console.log("server is runnig on port:"+ PORT);
    connectDB()
 })