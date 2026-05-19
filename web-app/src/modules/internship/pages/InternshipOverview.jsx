import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/public-pages.css"

/* ============= DUMMY DATA ============= */
const DUMMY_OVERVIEW = {
  enrolledCount: 2,
  completedCount: 1,
  inProgressCount: 1,
  totalPoints: 850,
  currentLevel: "Intermediate",
  performanceScore: 78,
  upcomingDeadline: "2026-02-15",
  activeCertificates: 1,
  stats: [
    { label: "Internships Enrolled", value: 2, icon: "🎓" },
    { label: "Completed", value: 1, icon: "✅" },
    { label: "Points Earned", value: 850, icon: "⭐" },
    { label: "Current Level", value: "Intermediate", icon: "📈" }
  ]
}

export default function InternshipOverview() {
  const [overview, setOverview] = useState(DUMMY_OVERVIEW)

  useEffect(() => {
    // Mock data load - replace with actual API call
    setOverview(DUMMY_OVERVIEW)
  }, [])

  return (
    <div className="internship-page">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Internship Hub</h1>
            <p className="page-subtitle">Start here to explore, enroll, and track your journey.</p>
          </div>
          <div className="actions">
            <Link className="btn ghost" to="/internships/browse">Browse Internships</Link>
            <Link className="btn primary" to="/intern/tasks">View Tasks</Link>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {overview.stats.map((stat, idx) => (
            <div key={idx} className="card" style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>{stat.icon}</div>
              <p className="card-text" style={{ margin: "0 0 8px" }}>{stat.label}</p>
              <h3 className="card-title" style={{ margin: "0" }}>{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="card-grid">
          <div className="card">
            <h3 className="card-title">Explore Opportunities</h3>
            <p className="card-text">Compare tiers, skills, and timelines before enrolling.</p>
            <div className="actions">
              <Link className="btn primary" to="/internships/browse">Browse Internships</Link>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Track Progress</h3>
            <p className="card-text">Monitor level progression, tasks, and performance scores.</p>
            <div className="actions">
              <Link className="btn primary" to="/intern/dashboard">Open Dashboard</Link>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Certificates</h3>
            <p className="card-text">See eligibility and preview your certificate.</p>
            <div className="actions">
              <Link className="btn primary" to="/intern/certificate">Go to Certificate Center</Link>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="card-title">Quick Actions</h3>
          <div className="actions">
            <Link className="btn secondary" to="/intern/tasks">Submit Task</Link>
            <Link className="btn secondary" to="/intern/certificate">Request Review</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
