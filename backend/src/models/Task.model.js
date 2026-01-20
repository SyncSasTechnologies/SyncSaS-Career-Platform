import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    internshipId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    deadline: Date,
  },
  { timestamps: true }
)

export default mongoose.model("Task", taskSchema)
