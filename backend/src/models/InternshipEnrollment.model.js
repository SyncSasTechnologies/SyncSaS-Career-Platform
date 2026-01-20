import mongoose from "mongoose"

const internshipEnrollmentSchema = new mongoose.Schema(
  {
    userUid: { type: String, required: true },
    internshipId: { type: String, required: true },

    profile: {
      education: String,
      college: String,
      degree: String,
      year: String,
      skills: [String],
      resume: String, // later (file/url)
    },

    status: {
      type: String,
      enum: ["enrolled", "completed"],
      default: "enrolled",
    },

    completionPercentage: { type: Number, default: 0 },

     certificate: {
  issued: { type: Boolean, default: false },
  certificateId: String,
  issuedAt: Date,
  type: {
    type: String,
    enum: ["joining", "completion", "performance"],
  },
  recommended: { type: Boolean, default: false },
  recommendationType: String,
  remarks: String,
  recommendedAt: Date,
},

  },
  { timestamps: true }
)

export default mongoose.model(
  "InternshipEnrollment",
  internshipEnrollmentSchema
)
