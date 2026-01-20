import InternshipEnrollment from "../../models/InternshipEnrollment.model.js"
import Internship from "../../models/Internship.model.js"

export const recommendCertificate = async (req, res) => {
  const { uid } = req.user
  const { enrollmentId, recommendationType, remarks } = req.body

  const enrollment = await InternshipEnrollment.findById(enrollmentId)
  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" })
  }

  const internship = await Internship.findOne({
    _id: enrollment.internshipId,
    mentorUid: uid,
  })
  if (!internship) {
    return res.status(403).json({ message: "Access denied" })
  }

  enrollment.certificate = {
    ...enrollment.certificate,
    recommended: true,
    recommendationType,
    remarks,
    recommendedAt: new Date(),
  }

  await enrollment.save()
  res.json({ success: true })
}
