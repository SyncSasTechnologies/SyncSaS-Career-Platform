import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchInternshipById } from "../services/publicInternship.service"

export default function InternshipDetail() {
  const { id } = useParams()
  const [internship, setInternship] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchInternshipById(id)
        setInternship(data)
      } catch {
        setInternship(null)
      }
    }
    load()
  }, [id])

  if (!internship) return <p>Internship not found.</p>

  return (
    <div style={{ padding: "20px" }}>
      <h1>{internship.title}</h1>

      <p>{internship.description}</p>

      <p><strong>Duration:</strong> {internship.duration}</p>
      <p><strong>Level:</strong> {internship.level}</p>

      <h3>What You Will Get</h3>
      <ul>
        <li>Hands-on tasks</li>
        <li>Mentor guidance</li>
        <li>Certificate & career score</li>
      </ul>

      <br />

      <Link to="/login">
        Enroll Now
      </Link>
    </div>
  )
}
