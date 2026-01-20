import express from "express"
import cors from "cors"

import userRoutes from "./routes/user.routes.js"
import internshipRoutes from "./routes/internship.routes.js"
import taskRoutes from "./routes/task.routes.js"
import adminRoutes from "./routes/admin/index.js"
import mentorRoutes from "./routes/mentor/index.js"
import publicInternshipRoutes from "./routes/public/internship.routes.js"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/internships", internshipRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/mentor", mentorRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/internships", publicInternshipRoutes)

app.get("/", (req, res) => {
  res.send("SyncSaS API Running 🚀")
})

export default app
