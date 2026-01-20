import Task from "../../models/Task.model.js"
import Internship from "../../models/Internship.model.js"

export const createTask = async (req, res) => {
  const { uid } = req.user
  const { internshipId, title, description, deadline } = req.body

  const internship = await Internship.findOne({
    _id: internshipId,
    mentorUid: uid,
  })

  if (!internship) {
    return res.status(403).json({ message: "Access denied" })
  }

  const task = await Task.create({
    internshipId,
    title,
    description,
    deadline,
  })

  res.status(201).json(task)
}

export const getTasksByInternship = async (req, res) => {
  const { uid } = req.user
  const { internshipId } = req.params

  const internship = await Internship.findOne({
    _id: internshipId,
    mentorUid: uid,
  })

  if (!internship) {
    return res.status(403).json({ message: "Access denied" })
  }

  const tasks = await Task.find({ internshipId })
  res.json(tasks)
}
