import User from "../models/User.model.js"

const mentorMiddleware = async (req, res, next) => {
  const { uid } = req.user
  const user = await User.findOne({ uid })

  if (!user || !user.roles.mentor) {
    return res.status(403).json({ message: "Mentor access only" })
  }

  next()
}

export default mentorMiddleware
