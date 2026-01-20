import User from "../../models/User.model.js"

export const getAllUsers = async (req, res) => {
  const { role } = req.query

  let filter = {}
  if (role) {
    filter[`roles.${role}`] = true
  }

  const users = await User.find(filter).sort({ createdAt: -1 })
  res.json(users)
}

export const updateUserRoles = async (req, res) => {
  const { userId } = req.params
  const { roles } = req.body

  const user = await User.findByIdAndUpdate(
    userId,
    { roles },
    { new: true }
  )

  res.json(user)
}

export const toggleBlockUser = async (req, res) => {
  const { userId } = req.params

  const user = await User.findById(userId)
  user.isBlocked = !user.isBlocked
  await user.save()

  res.json(user)
}
