import { useEffect, useState } from "react"
import { fetchSubmissions, reviewSubmission } from "../services/mentor.service"

export default function MentorDashboard() {
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    fetchSubmissions().then(setSubmissions)
  }, [])

  const handleReview = async (id, status) => {
    const feedback = prompt("Enter feedback")
    await reviewSubmission({
      submissionId: id,
      status,
      mentorFeedback: feedback,
    })
    fetchSubmissions().then(setSubmissions)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mentor Panel</h1>

      {submissions.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px" }}>
          <h4>{item.taskId?.title}</h4>
          <p><strong>Intern UID:</strong> {item.userUid}</p>
          <p><strong>Submission:</strong> {item.submissionLink}</p>
          <p><strong>Status:</strong> {item.status}</p>

          <button onClick={() => handleReview(item._id, "approved")}>
            Approve
          </button>{" "}
          <button onClick={() => handleReview(item._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  )
}
