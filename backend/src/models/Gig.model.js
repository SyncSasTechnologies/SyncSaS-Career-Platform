import mongoose from "mongoose"

const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    budget: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    skills: [String],
    postedBy: { type: String, required: true }, // freelancer uid
    freelancerName: String,
    freelancerImage: String,
    freelancerRating: { type: Number, default: 0 },
    freelancerReviews: { type: Number, default: 0 },
    deliveryTime: { type: Number }, // in days
    status: {
      type: String,
      enum: ["active", "inactive", "completed", "archived"],
      default: "active",
    },
    proposals: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true }
)

export default mongoose.model("Gig", gigSchema)
