import axios from "axios"

const API = "http://localhost:5000/api/internships"

export const fetchPublicInternships = async () => {
  const res = await axios.get(API)
  return res.data
}

export const fetchInternshipById = async (id) => {
  const res = await axios.get(`${API}/${id}`)
  return res.data
}
