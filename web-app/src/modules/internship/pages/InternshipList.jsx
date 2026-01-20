import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchPublicInternships } from "../services/publicInternship.service"

export default function InternshipList() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const data = await fetchPublicInternships()
      setInternships(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p>Loading internships...</p>

  return (
    <div style={{ padding: "20px" }}>
      <h1>Internships</h1>

      {internships.length === 0 && (
        <p>No internships available right now.</p>
      )}

      {internships.map((i) => (
        <div
          key={i._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "12px",
          }}
        >
          <h3>{i.title}</h3>
          <p>{i.description}</p>
          <p><strong>Duration:</strong> {i.duration}</p>
          <p><strong>Level:</strong> {i.level}</p>

          <Link to={`/internships/${i._id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}
