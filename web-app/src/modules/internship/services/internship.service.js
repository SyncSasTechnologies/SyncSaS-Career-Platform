import axios from "axios"
import { auth } from "../../../auth/firebase"

const API_URL = "http://localhost:5000/api/internships"

export const fetchMyInternships = async () => {
  const token = await auth.currentUser.getIdToken()

  const res = await axios.get(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
