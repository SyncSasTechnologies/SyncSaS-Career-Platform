import TaskSubmission from "../models/TaskSubmission.model.js"
import Task from "../models/Task.model.js"

export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await TaskSubmission.find()
      .populate("taskId")
      .sort({ createdAt: -1 })

    res.json(submissions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const reviewSubmission = async (req, res) => {
  try {
    const { submissionId, status, mentorFeedback } = req.body

    const submission = await TaskSubmission.findByIdAndUpdate(
      submissionId,
      { status, mentorFeedback },
      { new: true }
    )

    res.json(submission)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
