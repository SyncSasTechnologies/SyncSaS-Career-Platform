import express from "express"
import usersRoutes from "./users.routes.js"
import internshipRoutes from "./internship.routes.js"
import enrollmentRoutes from "./enrollment.routes.js"
import recommendationRoutes from "./recommendations.routes.js"

const router = express.Router()
router.use("/users", usersRoutes)
router.use("/internships", internshipRoutes)
router.use("/enrollments", enrollmentRoutes)
router.use("/recommendations", recommendationRoutes)


export default router
