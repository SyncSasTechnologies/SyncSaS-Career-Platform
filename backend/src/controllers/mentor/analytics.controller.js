import InternshipEnrollment from "../../models/InternshipEnrollment.model.js"
import TaskSubmission from "../../models/TaskSubmission.model.js"
import Internship from "../../models/Internship.model.js"

export const getInternshipAnalytics = async (req, res) => {
  const { uid } = req.user
  const { internshipId } = req.params

  // Ensure mentor owns the internship
  const internship = await Internship.findOne({
    _id: internshipId,
    mentorUid: uid,
  })
  if (!internship) {
    return res.status(403).json({ message: "Access denied" })
  }

  const enrollments = await InternshipEnrollment.find({ internshipId })

  const analytics = await Promise.all(
    enrollments.map(async (e) => {
      const submissions = await TaskSubmission.find({ userUid: e.userUid })
      const approved = submissions.filter(s => s.status === "approved").length

      return {
        enrollmentId: e._id,
        userUid: e.userUid,
        completionPercentage: e.completionPercentage || 0,
        approvedTasks: approved,
        certificateIssued: e.certificate?.issued || false,
        atRisk: (e.completionPercentage || 0) < 40,
      }
    })
  )

  res.json({
    totalStudents: enrollments.length,
    analytics,
  })
}