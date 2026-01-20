import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { auth } from "../../auth/firebase"

export default function Submissions() {
  const { taskId } = useParams()

  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    const fetchSubmissions = async () => {
      try {
        if (!auth.currentUser) {
          setError("User not authenticated")
          setLoading(false)
          return
        }

        const token = await auth.currentUser.getIdToken()

        const res = await axios.get(
          `http://localhost:5000/api/mentor/submissions/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (isMounted) {
          setSubs(res.data)
          setLoading(false)
        }
      } catch (err) {
        console.error("Fetch error:", err)
        if (isMounted) {
          setError("Failed to load submissions")
          setLoading(false)
        }
      }
    }

    fetchSubmissions()

    return () => {
      isMounted = false
    }
  }, [taskId])

  const reviewSubmission = async (submissionId, status) => {
    const feedback = prompt("Enter feedback")
    if (feedback === null) return

    try {
      const token = await auth.currentUser.getIdToken()

      await axios.post(
        "http://localhost:5000/api/mentor/submissions/review",
        {
          submissionId,
          status,
          mentorFeedback: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // Reload submissions after review
      setLoading(true)
      setError("")

      // Re-fetch safely
      const res = await axios.get(
        `http://localhost:5000/api/mentor/submissions/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setSubs(res.data)
      setLoading(false)
    } catch (err) {
      console.error("Review error:", err)
      alert("Failed to submit review")
    }
  }

  // ---------------- UI STATES ----------------

  if (loading) return <p>Loading submissions...</p>

  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
      <h2>Task Submissions</h2>

      {subs.length === 0 && <p>No submissions yet</p>}

      {subs.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <p>
            <strong>User UID:</strong> {s.userUid}
          </p>

          <p>
            <strong>Submission:</strong>{" "}
            <a
              href={s.submissionLink}
              target="_blank"
              rel="noreferrer"
            >
              View Link
            </a>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  s.status === "approved"
                    ? "green"
                    : s.status === "rejected"
                    ? "red"
                    : "orange",
              }}
            >
              {s.status}
            </span>
          </p>

          {s.status === "pending" && (
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => reviewSubmission(s._id, "approved")}
                style={{ marginRight: "10px" }}
              >
                Approve
              </button>

              <button
                onClick={() => reviewSubmission(s._id, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}