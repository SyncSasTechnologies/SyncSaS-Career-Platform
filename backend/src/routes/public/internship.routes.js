import express from "express"
import {
  getPublicInternships,
  getPublicInternshipById,
} from "../../controllers/public/internship.controller.js"

const router = express.Router()

router.get("/", getPublicInternships)
router.get("/:id", getPublicInternshipById)

export default router
