import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import adminMiddleware from "../../middleware/admin.middleware.js"
import {
  getAllInternships,
  approveInternship,
  rejectInternship,
  archiveInternship,
} from "../../controllers/admin/internship.controller.js"

const router = express.Router()

router.get("/", authMiddleware, adminMiddleware, getAllInternships)
router.patch("/:id/approve", authMiddleware, adminMiddleware, approveInternship)
router.patch("/:id/reject", authMiddleware, adminMiddleware, rejectInternship)
router.patch("/:id/archive", authMiddleware, adminMiddleware, archiveInternship)

export default router
