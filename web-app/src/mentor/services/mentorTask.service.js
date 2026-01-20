import axios from "axios"
import { auth } from "../../auth/firebase"

const API = "http://localhost:5000/api/mentor/tasks"

const authHeader = async () => ({
  headers: {
    Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
  },
})

export const createTask = async (data) => {
  return axios.post(API, data, await authHeader())
}

export const fetchTasks = async (internshipId) => {
  const res = await axios.get(
    `${API}/${internshipId}`,
    await authHeader()
  )
  return res.data
}