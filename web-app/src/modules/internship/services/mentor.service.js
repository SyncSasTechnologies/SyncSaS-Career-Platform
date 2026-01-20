import axios from "axios"
import { auth } from "../../../auth/firebase"

const API_URL = "http://localhost:5000/api/mentor"

export const fetchSubmissions = async () => {
  const token = await auth.currentUser.getIdToken()
  const res = await axios.get(`${API_URL}/submissions`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const reviewSubmission = async (data) => {
  const token = await auth.currentUser.getIdToken()
  return axios.post(`${API_URL}/review`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
