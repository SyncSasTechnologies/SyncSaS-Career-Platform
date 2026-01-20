import InternshipEnrollment from "../../models/InternshipEnrollment.model.js"
import Internship from "../../models/Internship.model.js"

export const getEnrollmentsByInternship = async (req, res) => {
  const { uid } = req.user
  const { internshipId } = req.params

  // Ensure internship belongs to mentor
  const internship = await Internship.findOne({
    _id: internshipId,
    mentorUid: uid,
  })

  if (!internship) {
    return res.status(403).json({ message: "Access denied" })
  }

  const enrollments = await InternshipEnrollment.find({
    internshipId,
  })

  res.json(enrollments)
}
