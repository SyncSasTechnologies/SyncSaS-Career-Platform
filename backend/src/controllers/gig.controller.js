import Gig from "../models/Gig.model.js"
import User from "../models/User.model.js"

// Create a new gig
export const createGig = async (req, res) => {
  try {
    const { uid } = req.user
    const { title, description, category, budget, skills, deliveryTime, image } = req.body

    // Get freelancer info
    const freelancer = await User.findOne({ uid })
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" })
    }

    // Create gig
    const gig = await Gig.create({
      title,
      description,
      category,
      budget,
      skills: skills || [],
      postedBy: uid,
      freelancerName: freelancer.name,
      freelancerImage: freelancer.profileImage || "",
      freelancerRating: freelancer.rating || 0,
      freelancerReviews: freelancer.reviews || 0,
      deliveryTime,
      image,
    })

    // Activate freelancer role
    await User.findOneAndUpdate(
      { uid },
      { "roles.freelancer": true },
      { new: true }
    )

    res.status(201).json(gig)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all gigs with filters
export const getAllGigs = async (req, res) => {
  try {
    const { category, skills, minBudget, maxBudget, search } = req.query

    let filter = { status: "active" }

    if (category) filter.category = category
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }
    if (minBudget || maxBudget) {
      filter["budget.min"] = {}
      if (minBudget) filter["budget.min"].$gte = parseInt(minBudget)
      if (maxBudget) filter["budget.max"] = filter["budget.max"] || {}
      if (maxBudget) filter["budget.max"].$lte = parseInt(maxBudget)
    }
    if (skills) {
      filter.skills = { $in: Array.isArray(skills) ? skills : [skills] }
    }

    const gigs = await Gig.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)

    res.json(gigs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get gig by ID
export const getGigById = async (req, res) => {
  try {
    const { id } = req.params

    const gig = await Gig.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" })
    }

    res.json(gig)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get my gigs (freelancer)
export const getMyGigs = async (req, res) => {
  try {
    const { uid } = req.user

    const gigs = await Gig.find({ postedBy: uid }).sort({ createdAt: -1 })

    res.json(gigs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update gig
export const updateGig = async (req, res) => {
  try {
    const { uid } = req.user
    const { id } = req.params
    const { title, description, category, budget, skills, deliveryTime, status, image } = req.body

    const gig = await Gig.findById(id)
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" })
    }

    // Check if user is the gig owner
    if (gig.postedBy !== uid) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    // Update gig
    const updatedGig = await Gig.findByIdAndUpdate(
      id,
      { title, description, category, budget, skills, deliveryTime, status, image },
      { new: true }
    )

    res.json(updatedGig)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete gig
export const deleteGig = async (req, res) => {
  try {
    const { uid } = req.user
    const { id } = req.params

    const gig = await Gig.findById(id)
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" })
    }

    // Check if user is the gig owner
    if (gig.postedBy !== uid) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    await Gig.findByIdAndDelete(id)

    res.json({ message: "Gig deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get gigs by category
export const getGigsByCategory = async (req, res) => {
  try {
    const { category } = req.params

    const gigs = await Gig.find({ category, status: "active" })
      .sort({ createdAt: -1 })
      .limit(20)

    res.json(gigs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
