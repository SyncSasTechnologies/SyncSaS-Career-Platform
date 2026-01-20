import axios from "axios"
import { auth } from "../../auth/firebase"

const API = "http://localhost:5000/api/admin/internships"

export const fetchInternships = async () => {
  const token = await auth.currentUser.getIdToken()
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const approveInternship = async (id, remarks) => {
  const token = await auth.currentUser.getIdToken()
  return axios.patch(
    `${API}/${id}/approve`,
    { remarks },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export const rejectInternship = async (id, remarks) => {
  const token = await auth.currentUser.getIdToken()
  return axios.patch(
    `${API}/${id}/reject`,
    { remarks },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}


export const archiveInternship = async (id) => {
  const token = await auth.currentUser.getIdToken()
  return axios.patch(
    `${API}/${id}/archive`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
}
