import express from "express"
import {
  createGig,
  getAllGigs,
  getGigById,
  getMyGigs,
  updateGig,
  deleteGig,
  getGigsByCategory,
} from "../controllers/gig.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

// Public routes
router.get("/", getAllGigs)
router.get("/category/:category", getGigsByCategory)
router.get("/:id", getGigById)

// Protected routes (freelancer only)
router.post("/", authMiddleware, createGig)
router.get("/my-gigs/list", authMiddleware, getMyGigs)
router.put("/:id", authMiddleware, updateGig)
router.delete("/:id", authMiddleware, deleteGig)

export default router
