import axios from "axios"
import { auth } from "../../auth/firebase"

const API = "http://localhost:5000/api/admin/recommendations"

export const fetchRecommendations = async () => {
  const token = await auth.currentUser.getIdToken()
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const approveRecommendation = async (enrollmentId) => {
  const token = await auth.currentUser.getIdToken()
  return axios.post(
    `${API}/approve`,
    { enrollmentId },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}