import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import mentorMiddleware from "../../middleware/mentor.middleware.js"
import {
  createInternship,
  updateInternship,
  submitInternship,
  getMyInternships,
} from "../../controllers/mentor/internships.controller.js"

const router = express.Router()

router.post("/", authMiddleware, mentorMiddleware, createInternship)
router.put("/:id", authMiddleware, mentorMiddleware, updateInternship)
router.post("/:id/submit", authMiddleware, mentorMiddleware, submitInternship)
router.get("/", authMiddleware, mentorMiddleware, getMyInternships)

export default router
