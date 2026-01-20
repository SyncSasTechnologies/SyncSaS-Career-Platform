import InternshipEnrollment from "../../models/InternshipEnrollment.model.js"

export const getAllEnrollments = async (req, res) => {
  const enrollments = await InternshipEnrollment.find().sort({
    createdAt: -1,
  })
  res.json(enrollments)
}

export const issueCertificate = async (req, res) => {
  const { enrollmentId, type } = req.body

  const certificateId = `SYNC-${Date.now()}`

  const enrollment = await InternshipEnrollment.findByIdAndUpdate(
    enrollmentId,
    {
      certificate: {
        issued: true,
        certificateId,
        issuedAt: new Date(),
        type,
      },
      status: "completed",
      completionPercentage: 100,
    },
    { new: true }
  )

  res.json(enrollment)
}

export const verifyCertificate = async (req, res) => {
  const { certificateId } = req.params

  const enrollment = await InternshipEnrollment.findOne({
    "certificate.certificateId": certificateId,
  })

  if (!enrollment) {
    return res.status(404).json({ valid: false })
  }

  res.json({
    valid: true,
    internshipId: enrollment.internshipId,
    issuedAt: enrollment.certificate.issuedAt,
    type: enrollment.certificate.type,
  })
}
