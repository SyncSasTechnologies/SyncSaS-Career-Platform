import axios from "axios"
import { auth } from "../../auth/firebase"

const API = "http://localhost:5000/api/admin/enrollments"

export const fetchEnrollments = async () => {
  const token = await auth.currentUser.getIdToken()
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const issueCertificate = async (data) => {
  const token = await auth.currentUser.getIdToken()
  return axios.post(`${API}/certificate`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
