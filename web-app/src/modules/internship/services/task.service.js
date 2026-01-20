import axios from "axios"
import { auth } from "../../../auth/firebase"

const API_URL = "http://localhost:5000/api/tasks"

export const fetchTasks = async (internshipId) => {
  const token = await auth.currentUser.getIdToken()
  const res = await axios.get(`${API_URL}/${internshipId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const submitTask = async (data) => {
  const token = await auth.currentUser.getIdToken()
  return axios.post(`${API_URL}/submit`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
