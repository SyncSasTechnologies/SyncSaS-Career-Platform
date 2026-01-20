import mongoose from "mongoose"

const taskSubmissionSchema = new mongoose.Schema(
  {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    userUid: String,
    submissionLink: String,
    description: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    mentorFeedback: String,
  },
  { timestamps: true }
)

export default mongoose.model("TaskSubmission", taskSubmissionSchema)
