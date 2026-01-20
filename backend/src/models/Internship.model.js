import mongoose from "mongoose"

const internshipSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    duration: String,
    level: String,
    adminRemarks: String,
    approvedAt: Date,


    mentorUid: String,

    status: {
      type: String,
      enum: ["draft", "approved", "rejected", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Internship", internshipSchema)
