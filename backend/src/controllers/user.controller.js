import User from "../models/User.model.js"

export const registerUser = async (req, res) => {
  try {
    const { uid, email, name } = req.body

    // Check if user already exists
    let user = await User.findOne({ uid })
    if (user) {
      return res.status(200).json(user)
    }

    // Create new user
    user = await User.create({
      uid,
      email,
      name,
      roles: {
        intern: false,
        jobSeeker: false,
        freelancer: false,
        mentor: false,
        employer: false,
        client: false,
        admin: false,
      },
    })

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const { uid } = req.user   // from Firebase token
    const user = await User.findOne({ uid })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

