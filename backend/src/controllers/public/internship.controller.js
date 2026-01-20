import Internship from "../../models/Internship.model.js"

export const getPublicInternships = async (req, res) => {
  const internships = await Internship.find({
    status: "approved",
  }).sort({ approvedAt: -1 })

  res.json(internships)
}

export const getPublicInternshipById = async (req, res) => {
  const { id } = req.params

  const internship = await Internship.findOne({
    _id: id,
    status: "approved",
  })

  if (!internship) {
    return res.status(404).json({ message: "Internship not found" })
  }

  res.json(internship)
}
