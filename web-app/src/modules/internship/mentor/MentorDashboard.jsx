import { useEffect, useState } from "react"
import { fetchSubmissions, reviewSubmission } from "../services/mentor.service"
import StatsCard from "../../../components/dashboard/StatsCard"

export default function MentorDashboard() {

  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions().then((data) => {
      setSubmissions(data)
      setLoading(false)
    })
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

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>Loading submissions...</p>
      </div>
    )
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: "var(--text)", marginBottom: "4px" }}>
          Mentor Panel 👨‍🏫
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Review and manage intern submissions
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "28px" }}>
        <StatsCard icon="📝" label="Total Submissions" value={submissions.length} color="#6366F1" />
        <StatsCard icon="⏳" label="Pending" value={submissions.filter(s => s.status === "pending").length} color="#F59E0B" />
        <StatsCard icon="✅" label="Approved" value={submissions.filter(s => s.status === "approved").length} color="#10B981" />
        <StatsCard icon="❌" label="Rejected" value={submissions.filter(s => s.status === "rejected").length} color="#EF4444" />
      </div>

      {/* Empty State */}
      {submissions.length === 0 && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "60px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>No Submissions Yet!</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>When interns submit tasks they will appear here.</p>
        </div>
      )}

      {/* Submissions List */}
      {submissions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {submissions.map((item) => (
            <SubmissionCard
              key={item._id}
              item={item}
              onReview={handleReview}
            />
          ))}
        </div>
      )}

    </div>
  )
}

// Separate component — fixes the JSX closing tag error!
function SubmissionCard({ item, onReview }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>

      {/* Top Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>

        {/* Task Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#6366F120", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
            📋
          </div>
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "3px" }}>
              {item.taskId?.title || "Task"}
            </h4>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Intern: {item.userUid}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span style={{
          padding: "5px 14px",
          borderRadius: "99px",
          fontSize: "12px",
          fontWeight: 700,
          background: item.status === "approved" ? "#F0FDF4" : item.status === "rejected" ? "#FEF2F2" : "#FFF7ED",
          color: item.status === "approved" ? "#16A34A" : item.status === "rejected" ? "#DC2626" : "#D97706",
          textTransform: "capitalize",
        }}>
          {item.status}
        </span>

      </div>

      {/* Submission Link */}
      <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "16px" }}>🔗</span>
        <a href={item.submissionLink} target="_blank" rel="noreferrer" style={{ fontSize: "14px", color: "var(--primary)", fontWeight: 500, wordBreak: "break-all" }}>
          {item.submissionLink || "No link provided"}
        </a>
      </div>

      {/* Approve + Reject Buttons */}
      {item.status === "pending" && (
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => onReview(item._id, "approved")}
            style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #10B981, #059669)", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}
          >
            ✅ Approve
          </button>
          <button
            onClick={() => onReview(item._id, "rejected")}
            style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #EF4444, #DC2626)", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}
          >
            ❌ Reject
          </button>
        </div>
      )}

      {/* Feedback Box */}
      {item.status !== "pending" && item.mentorFeedback && (
        <div style={{ background: item.status === "approved" ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${item.status === "approved" ? "#BBF7D0" : "#FECACA"}`, borderRadius: "10px", padding: "12px 16px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: item.status === "approved" ? "#16A34A" : "#DC2626", marginBottom: "4px" }}>
            💬 Mentor Feedback
          </p>
          <p style={{ fontSize: "13px", color: "var(--text)" }}>
            {item.mentorFeedback}
          </p>
        </div>
      )}

    </div>
  )
}