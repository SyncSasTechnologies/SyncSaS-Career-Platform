import express from "express"
import authMiddleware from "../../middleware/auth.middleware.js"
import adminMiddleware from "../../middleware/admin.middleware.js"
import {
  getAllUsers,
  updateUserRoles,
  toggleBlockUser
} from "../../controllers/admin/users.controller.js"

const router = express.Router()

router.get("/", authMiddleware, adminMiddleware, getAllUsers)
router.patch("/:userId/roles", authMiddleware, adminMiddleware, updateUserRoles)
router.patch("/:userId/block", authMiddleware, adminMiddleware, toggleBlockUser)

export default router
