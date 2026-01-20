import express from "express"
import { registerUser, getCurrentUser } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"


const router = express.Router()

// Register / sync user after Firebase signup
router.post("/register", authMiddleware, registerUser)
router.get("/me", authMiddleware, getCurrentUser)


export default router
