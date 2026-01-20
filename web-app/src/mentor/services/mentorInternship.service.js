import axios from "axios"
import { auth } from "../../auth/firebase"

const API = "http://localhost:5000/api/mentor/internships"

const tokenHeader = async () => ({
  headers: {
    Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
  },
})

export const createInternship = async (data) => {
  return axios.post(API, data, await tokenHeader())
}

export const fetchMyInternships = async () => {
  const res = await axios.get(API, await tokenHeader())
  return res.data
}

export const submitInternship = async (id) => {
  return axios.post(`${API}/${id}/submit`, {}, await tokenHeader())
}
