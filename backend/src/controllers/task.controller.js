import Task from "../models/Task.model.js"
import TaskSubmission from "../models/TaskSubmission.model.js"

export const getTasksByInternship = async (req, res) => {
  const { internshipId } = req.params
  const tasks = await Task.find({ internshipId })
  res.json(tasks)
}

export const submitTask = async (req, res) => {
  const { uid } = req.user
  const { taskId, submissionLink, description } = req.body

  const submission = await TaskSubmission.create({
    taskId,
    userUid: uid,
    submissionLink,
    description,
  })

  res.status(201).json(submission)
}
