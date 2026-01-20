import axios from "axios"
import { auth } from "../../auth/firebase"

const API = "http://localhost:5000/api/mentor"

const authHeader = async () => ({
  headers: {
    Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
  },
})

export const fetchAnalytics = async (internshipId) => {
  const res = await axios.get(
    `${API}/analytics/${internshipId}`,
    await authHeader()
  )
  return res.data
}

export const recommendCertificate = async (data) => {
  return axios.post(
    `${API}/certificates/recommend`,
    data,
    await authHeader()
  )
}
