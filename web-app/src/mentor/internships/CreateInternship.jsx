import { useState } from "react"
import { createInternship } from "../services/mentorInternship.service"
import { useNavigate } from "react-router-dom"

export default function CreateInternship() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createInternship(form)
    navigate("/mentor/internships")
  }

  return (
    <div>
      <h2>Create Internship</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required /><br /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange} required /><br /><br />
        <input name="duration" placeholder="Duration" onChange={handleChange} required /><br /><br />
        <input name="level" placeholder="Level" onChange={handleChange} required /><br /><br />

        <button type="submit">Save Draft</button>
      </form>
    </div>
  )
}
