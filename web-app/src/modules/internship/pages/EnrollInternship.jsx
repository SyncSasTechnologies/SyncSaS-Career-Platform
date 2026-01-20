import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { auth } from "../../../auth/firebase"

export default function EnrollInternship() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    education: "",
    college: "",
    degree: "",
    year: "",
    skills: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = await auth.currentUser.getIdToken()

    await axios.post(
      "http://localhost:5000/api/internships/enroll",
      {
        internshipId: id,
        profile: {
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()),
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    navigate("/intern/dashboard")

  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Internship Enrollment</h2>

      <form onSubmit={handleSubmit}>
        <input name="education" placeholder="Education" onChange={handleChange} required /><br /><br />
        <input name="college" placeholder="College / University" onChange={handleChange} required /><br /><br />
        <input name="degree" placeholder="Degree" onChange={handleChange} required /><br /><br />
        <input name="year" placeholder="Year" onChange={handleChange} required /><br /><br />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} required /><br /><br />

        <button type="submit">Enroll</button>
      </form>
    </div>
  )
}
