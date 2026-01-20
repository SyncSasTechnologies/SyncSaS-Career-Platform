import InternshipEnrollment from "../../models/InternshipEnrollment.model.js"

export const getCertificateRecommendations = async (req, res) => {
  const recommendations = await InternshipEnrollment.find({
    "certificate.recommended": true,
    "certificate.issued": false,
  }).sort({ "certificate.recommendedAt": -1 })

  res.json(recommendations)
}

export const approveRecommendation = async (req, res) => {
  const { enrollmentId } = req.body

  const certificateId = `SYNC-${Date.now()}`

  const enrollment = await InternshipEnrollment.findByIdAndUpdate(
    enrollmentId,
    {
      "certificate.issued": true,
      "certificate.certificateId": certificateId,
      "certificate.issuedAt": new Date(),
      status: "completed",
      completionPercentage: 100,
    },
    { new: true }
  )

  res.json(enrollment)
}
