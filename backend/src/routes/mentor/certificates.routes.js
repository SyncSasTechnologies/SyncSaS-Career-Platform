import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import mentorMiddleware from "../../middleware/mentor.middleware.js"
import { recommendCertificate } from "../../controllers/mentor/certificates.controller.js"

const router = express.Router()
router.post("/recommend", authMiddleware, mentorMiddleware, recommendCertificate)
export default router
