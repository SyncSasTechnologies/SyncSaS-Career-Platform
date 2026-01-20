import express from "express"
import internshipRoutes from "./internships.routes.js"
import submissionRoutes from "./submissions.routes.js"
import enrollmentRoutes from "./enrollments.routes.js"
import taskRoutes from "./tasks.routes.js"
import analyticsRoutes from "./analytics.routes.js"
import certificateRoutes from "./certificates.routes.js"

const router = express.Router()

router.use("/internships", internshipRoutes)
router.use("/submissions", submissionRoutes)
router.use("/enrollments", enrollmentRoutes)
router.use("/tasks", taskRoutes)
router.use("/analytics", analyticsRoutes)
router.use("/certificates", certificateRoutes)


export default router
