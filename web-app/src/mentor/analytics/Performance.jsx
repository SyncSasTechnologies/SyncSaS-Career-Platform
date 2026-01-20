import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  fetchAnalytics,
  recommendCertificate,
} from "../services/mentorAnalytics.service"

export default function Performance() {
  const { internshipId } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadAnalytics = async () => {
      try {
        const res = await fetchAnalytics(internshipId)
        if (isMounted) {
          setData(res)
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadAnalytics()

    return () => {
      isMounted = false
    }
  }, [internshipId])

  const recommend = async (enrollmentId, type) => {
    const remarks = prompt("Add remarks (optional)")
    await recommendCertificate({
      enrollmentId,
      recommendationType: type,
      remarks,
    })
    alert("Recommendation sent to Admin")
  }

  if (!data) return <p>Loading analytics...</p>

  return (
    <div>
      <h2>Internship Analytics</h2>
      <p>Total Students: {data.totalStudents}</p>

      {data.analytics.map((a) => (
        <div
          key={a.enrollmentId}
          style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}
        >
          <p><strong>User UID:</strong> {a.userUid}</p>
          <p>Completion: {a.completionPercentage}%</p>
          <p>Approved Tasks: {a.approvedTasks}</p>
          <p>Status: {a.atRisk ? "⚠️ At Risk" : "On Track"}</p>
          <p>Certificate Issued: {a.certificateIssued ? "Yes" : "No"}</p>

          {!a.certificateIssued && (
            <>
              <button onClick={() => recommend(a.enrollmentId, "joining")}>
                Recommend Joining
              </button>{" "}
              <button onClick={() => recommend(a.enrollmentId, "completion")}>
                Recommend Completion
              </button>{" "}
              <button onClick={() => recommend(a.enrollmentId, "performance")}>
                Recommend Performance
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}