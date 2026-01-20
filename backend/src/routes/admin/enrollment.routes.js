import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import adminMiddleware from "../../middleware/admin.middleware.js"
import {
  getAllEnrollments,
  issueCertificate,
} from "../../controllers/admin/enrollment.controller.js"
import { verifyCertificate } from "../../controllers/admin/enrollment.controller.js"

const router = express.Router()

router.get("/", authMiddleware, adminMiddleware, getAllEnrollments)
router.post("/certificate", authMiddleware, adminMiddleware, issueCertificate)
router.get("/verify/:certificateId", verifyCertificate) // public

export default router
