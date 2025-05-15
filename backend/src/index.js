 import express from "express"
 import authRoute from "./routes/auth.route.js"

 const app = express()

  app.use("/api/auth", authRoute)

  app.listen(5001, ()=>{
    console.log("server is runnig on port 5001");
    
 })