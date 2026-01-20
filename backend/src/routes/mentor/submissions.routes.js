import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import {
  getAllSubmissions,
  reviewSubmission
} from "../../controllers/mentor.controller.js"

const router = express.Router()

router.get("/", authMiddleware, getAllSubmissions)
router.post("/review", authMiddleware, reviewSubmission)

export default router
