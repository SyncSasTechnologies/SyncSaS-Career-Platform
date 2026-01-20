import { useEffect, useState } from "react"
import { fetchMyInternships } from "../services/internship.service"

export default function InternDashboard() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMyInternships()
        setInternships(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <p>Loading dashboard...</p>

  if (internships.length === 0) {
    return <p>No internships enrolled yet.</p>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Intern Dashboard</h1>

      {internships.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>Internship: {item.internshipId}</h3>

          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Progress:</strong> 0%</p>

          <h4>Tasks</h4>
          <p>Task system connected (UI coming next)</p>

          <h4>Mentor Feedback</h4>
          <p>Not reviewed yet.</p>

          <h4>Certificate</h4>
          <p>Not available</p>
        </div>
      ))}
    </div>
  )
}
