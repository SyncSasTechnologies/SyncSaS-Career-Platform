import axios from "axios"
import { auth } from "../../auth/firebase"

const API = "http://localhost:5000/api/admin/users"

export const fetchUsers = async (role) => {
  const token = await auth.currentUser.getIdToken()
  const res = await axios.get(role ? `${API}?role=${role}` : API, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const updateRoles = async (id, roles) => {
  const token = await auth.currentUser.getIdToken()
  return axios.patch(
    `${API}/${id}/roles`,
    { roles },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export const toggleBlock = async (id) => {
  const token = await auth.currentUser.getIdToken()
  return axios.patch(
    `${API}/${id}/block`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
}
