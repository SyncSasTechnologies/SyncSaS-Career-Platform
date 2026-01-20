import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import mentorMiddleware from "../../middleware/mentor.middleware.js"
import { getEnrollmentsByInternship } from "../../controllers/mentor/enrollments.controller.js"

const router = express.Router()

router.get(
  "/:internshipId",
  authMiddleware,
  mentorMiddleware,
  getEnrollmentsByInternship
)

export default router
