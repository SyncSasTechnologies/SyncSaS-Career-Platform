import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { auth } from "../../auth/firebase"

export default function Submissions() {
  const { taskId } = useParams()
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchSubs = async () => {
      try {
        if (!auth.currentUser) return

        const token = await auth.currentUser.getIdToken()
        const res = await axios.get(
          `http://localhost:5000/api/mentor/submissions/${taskId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        if (isMounted) {
          setSubs(res.data)
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        if (isMounted) setLoading(false)
      }
    }

    fetchSubs()

    return () => {
      isMounted = false
    }
  }, [taskId])

  const review = async (id, status) => {
    const feedback = prompt("Enter feedback")
    if (feedback === null) return

    try {
      const token = await auth.currentUser.getIdToken()

      await axios.post(
        "http://localhost:5000/api/mentor/submissions/review",
        {
          submissionId: id,
          status,
          mentorFeedback: feedback,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      // re-fetch safely
      setLoading(true)

      const res = await axios.get(
        `http://localhost:5000/api/mentor/submissions/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setSubs(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      alert("Review failed")
    }
  }

  if (loading) return <p>Loading submissions...</p>

  return (
    <div>
      <h2>Task Submissions</h2>

      {subs.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p><strong>User:</strong> {s.userUid}</p>

          <p>
            <strong>Link:</strong>{" "}
            <a href={s.submissionLink} target="_blank" rel="noreferrer">
              View
            </a>
          </p>

          <p><strong>Status:</strong> {s.status}</p>

          {s.status === "pending" && (
            <>
              <button onClick={() => review(s._id, "approved")}>
                Approve
              </button>{" "}
              <button onClick={() => review(s._id, "rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}