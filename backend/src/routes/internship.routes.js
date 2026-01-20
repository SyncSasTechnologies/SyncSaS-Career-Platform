import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { enrollInternship, getMyInternships } from "../controllers/internship.controller.js"


const router = express.Router()

router.post("/enroll", authMiddleware, enrollInternship)
router.get("/my", authMiddleware, getMyInternships)


export default router
