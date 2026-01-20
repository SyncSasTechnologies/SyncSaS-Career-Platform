import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import adminMiddleware from "../../middleware/admin.middleware.js"
import {
  getCertificateRecommendations,
  approveRecommendation,
} from "../../controllers/admin/recommendations.controller.js"

const router = express.Router()

router.get("/", authMiddleware, adminMiddleware, getCertificateRecommendations)
router.post("/approve", authMiddleware, adminMiddleware, approveRecommendation)

export default router