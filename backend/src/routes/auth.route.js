import express from "express";
import { login, logout, signup, profileUpdate,checkAuth } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.protected.js";

const router = express.Router()

router.post("/signup" , signup)
router.post("/login" , login)
router.post("/logout" , logout)

router.put("/profile-update" , protectedRoute ,profileUpdate)

router.get("/check", protectedRoute, checkAuth);




export default router;