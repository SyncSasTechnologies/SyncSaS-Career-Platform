import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import mentorMiddleware from "../../middleware/mentor.middleware.js"
import {
  createTask,
  getTasksByInternship,
} from "../../controllers/mentor/tasks.controller.js"

const router = express.Router()

router.post("/", authMiddleware, mentorMiddleware, createTask)
router.get(
  "/:internshipId",
  authMiddleware,
  mentorMiddleware,
  getTasksByInternship
)

export default router
