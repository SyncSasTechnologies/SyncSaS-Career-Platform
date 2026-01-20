import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import mentorMiddleware from "../../middleware/mentor.middleware.js"
import { getInternshipAnalytics } from "../../controllers/mentor/analytics.controller.js"

const router = express.Router()
router.get("/:internshipId", authMiddleware, mentorMiddleware, getInternshipAnalytics)
export default router