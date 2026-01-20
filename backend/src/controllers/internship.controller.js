import InternshipEnrollment from "../models/InternshipEnrollment.model.js"
import User from "../models/User.model.js"

export const enrollInternship = async (req, res) => {
  try {
    const { uid } = req.user
    const { internshipId, profile } = req.body

    // Prevent duplicate enrollment
    const existing = await InternshipEnrollment.findOne({
      userUid: uid,
      internshipId,
    })
    if (existing) {
      return res.status(400).json({ message: "Already enrolled" })
    }

    // Create enrollment
    const enrollment = await InternshipEnrollment.create({
      userUid: uid,
      internshipId,
      profile,
    })

    // Activate intern role
    await User.findOneAndUpdate(
      { uid },
      { "roles.intern": true },
      { new: true }
    )

    res.status(201).json(enrollment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyInternships = async (req, res) => {
  try {
    const { uid } = req.user

    const enrollments = await InternshipEnrollment.find({
      userUid: uid,
    })

    res.json(enrollments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
