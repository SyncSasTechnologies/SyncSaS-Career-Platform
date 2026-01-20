import User from "../models/User.model.js"

const adminMiddleware = async (req, res, next) => {
  const { uid } = req.user
  const user = await User.findOne({ uid })

  if (!user || !user.roles.admin) {
    return res.status(403).json({ message: "Admin access only" })
  }

  next()
}

export default adminMiddleware
