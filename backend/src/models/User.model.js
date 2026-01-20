import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: String,
    


    roles: {
      intern: { type: Boolean, default: false },
      jobSeeker: { type: Boolean, default: false },
      freelancer: { type: Boolean, default: false },
      mentor: { type: Boolean, default: false },
      employer: { type: Boolean, default: false },
      client: { type: Boolean, default: false },
      admin: { type: Boolean, default: false },
    },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
