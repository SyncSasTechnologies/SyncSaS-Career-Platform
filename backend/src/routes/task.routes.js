import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { getTasksByInternship, submitTask } from "../controllers/task.controller.js"

const router = express.Router()

router.get("/:internshipId", authMiddleware, getTasksByInternship)
router.post("/submit", authMiddleware, submitTask)

export default router
