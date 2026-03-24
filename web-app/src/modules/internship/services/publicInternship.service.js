import axios from "axios"

const API = "http://localhost:5000/api/internships"

const MOCK_PUBLIC_INTERNSHIPS = [
  {
    _id: "pub-1",
    title: "Full Stack Web Development",
    description: "Build production-ready MERN apps with mentor guidance.",
    duration: "8 weeks",
    level: "Beginner",
    tier: "Premium",
    mode: "Remote"
  },
  {
    _id: "pub-2",
    title: "Data Science Fundamentals",
    description: "Learn data analysis, visualization, and ML basics.",
    duration: "6 weeks",
    level: "Beginner",
    tier: "Basic",
    mode: "Hybrid"
  },
  {
    _id: "pub-3",
    title: "Corporate Software Engineering",
    description: "Enterprise workflows, microservices, and DevOps.",
    duration: "10 weeks",
    level: "Intermediate",
    tier: "Corporate",
    mode: "Remote"
  }
]

export const fetchPublicInternships = async () => {
  try {
    const res = await axios.get(API)
    return res.data
  } catch (err) {
    console.warn("Using mock public internships:", err.message)
    return MOCK_PUBLIC_INTERNSHIPS
  }
}

export const fetchInternshipById = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`)
    return res.data
  } catch (err) {
    return MOCK_PUBLIC_INTERNSHIPS.find((item) => item._id === id)
  }
}
