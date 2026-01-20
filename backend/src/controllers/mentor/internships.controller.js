import Internship from "../../models/Internship.model.js"

export const createInternship = async (req, res) => {
  const { uid } = req.user
  const { title, description, duration, level } = req.body

  const internship = await Internship.create({
    title,
    description,
    duration,
    level,
    mentorUid: uid,
    status: "draft",
  })

  res.status(201).json(internship)
}

export const updateInternship = async (req, res) => {
  const { uid } = req.user
  const { id } = req.params

  const internship = await Internship.findOneAndUpdate(
    { _id: id, mentorUid: uid, status: { $in: ["draft", "rejected"] } },
    req.body,
    { new: true }
  )

  if (!internship) {
    return res.status(403).json({ message: "Cannot edit this internship" })
  }

  res.json(internship)
}

export const submitInternship = async (req, res) => {
  const { uid } = req.user
  const { id } = req.params

  const internship = await Internship.findOneAndUpdate(
    { _id: id, mentorUid: uid, status: "draft" },
    { status: "submitted" },
    { new: true }
  )

  if (!internship) {
    return res.status(400).json({ message: "Invalid submission" })
  }

  res.json(internship)
}

export const getMyInternships = async (req, res) => {
  const { uid } = req.user
  const internships = await Internship.find({ mentorUid: uid })
  res.json(internships)
}
