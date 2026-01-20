import Internship from "../../models/Internship.model.js"

export const getAllInternships = async (req, res) => {
  const internships = await Internship.find().sort({ createdAt: -1 })
  res.json(internships)
}

 

export const archiveInternship = async (req, res) => {
  const { id } = req.params
  const internship = await Internship.findByIdAndUpdate(
    id,
    { status: "archived" },
    { new: true }
  )
  res.json(internship)
}

export const approveInternship = async (req, res) => {
  const { id } = req.params
  const { remarks } = req.body

  const internship = await Internship.findByIdAndUpdate(
    id,
    {
      status: "approved",
      adminRemarks: remarks,
      approvedAt: new Date(),
    },
    { new: true }
  )

  res.json(internship)
}

export const rejectInternship = async (req, res) => {
  const { id } = req.params
  const { remarks } = req.body

  const internship = await Internship.findByIdAndUpdate(
    id,
    {
      status: "rejected",
      adminRemarks: remarks,
    },
    { new: true }
  )

  res.json(internship)
}
