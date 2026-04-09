import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchInternshipById } from "../services/publicInternship.service"
import "../styles/public-pages.css"

/* ============= DUMMY DATA ============= */
const DUMMY_INTERNSHIP = {
  _id: "int-001",
  title: "Full Stack Web Development Internship",
  description: "Master modern web development with React, Node.js, and cloud deployment",
  longDescription: "A comprehensive internship program designed to teach you full-stack web development. You'll build real projects, learn industry best practices, and work with experienced mentors. This program covers frontend development with React, backend APIs with Node.js, database design with MongoDB, and cloud deployment on AWS.",
  tier: "Professional",
  level: "Intermediate",
  duration: "12 weeks",
  mode: "Remote",
  startDate: "February 15, 2026",
  benefits: [
    "Weekly 1-on-1 mentor sessions",
    "Code reviews and detailed feedback",
    "Certificate with verification ID",
    "Performance-based ranking and leaderboard",
    "Access to exclusive workshops",
    "Portfolio-ready projects"
  ],
  skills: ["React", "Node.js", "MongoDB", "AWS", "REST APIs"],
  taskCount: 18,
  projectCount: 3,
  certificateEligibility: ["Complete all Level 1 tasks", "Complete all Level 2 tasks", "Final capstone approved", "Minimum 80% performance score"]
}

export default function InternshipDetailPage() {
  const { id } = useParams()
  const [internship, setInternship] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchInternshipById(id)
        setInternship(data || DUMMY_INTERNSHIP)
      } catch {
        setInternship(DUMMY_INTERNSHIP)
      }
    }
    load()
  }, [id])

  if (!internship) {
    return (
      <div className="internship-page">
        <div className="page-container">
          <div className="card">
            <h2 className="card-title">Internship not found</h2>
            <p className="card-text">Try browsing available internships.</p>
            <Link className="btn primary" to="/internships/browse">Back to Browse</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="internship-page">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">{internship.title}</h1>
            <p className="page-subtitle">{internship.description}</p>
          </div>
          <div className="actions">
            <span className={`badge ${internship.tier?.toLowerCase() || "basic"}`}>{internship.tier || "Basic"}</span>
            <span className="badge status">{internship.level || "Level 1"}</span>
          </div>
        </div>

        <div className="two-column">
          <div className="section">
            <h3 className="card-title">Internship Overview</h3>
            <div className="card-meta" style={{ marginBottom: 16 }}>
              <span>Duration: {internship.duration}</span>
              <span>Mode: {internship.mode || "Remote"}</span>
              <span>Starts: {internship.startDate || "Rolling"}</span>
            </div>
            <p className="card-text">{internship.longDescription || "Build real-world skills with guided mentorship, tasks, and assessments."}</p>

            <h4 className="card-title">What you will get</h4>
            <ul className="list">
              {internship.benefits && internship.benefits.length > 0 ? (
                internship.benefits.map((benefit, idx) => <li key={idx}>{benefit}</li>)
              ) : (
                <>
                  <li>Hands-on tasks with mentor feedback</li>
                  <li>Level progression and performance score</li>
                  <li>Project portfolio and certification</li>
                </>
              )}
            </ul>

            <div className="actions" style={{ marginTop: 16 }}>
              <Link className="btn primary" to={`/internships/enroll/${internship._id}`}>
                Enroll Now
              </Link>
              <Link className="btn ghost" to="/internships/browse">Back to Browse</Link>
            </div>
          </div>

          <div className="section">
            <h3 className="card-title">Tier Benefits</h3>
            <div style={{ marginBottom: 12 }}>
              <p className="card-text"><strong>Tasks:</strong> {internship.taskCount || 0}</p>
              <p className="card-text"><strong>Projects:</strong> {internship.projectCount || 0}</p>
              {internship.skills && internship.skills.length > 0 && (
                <div>
                  <p className="card-text"><strong>Skills You'll Learn:</strong></p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {internship.skills.map((skill, idx) => (
                      <span key={idx} className="badge">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <h4 className="card-title">Certificate Eligibility</h4>
            <ul className="list">
              {internship.certificateEligibility && internship.certificateEligibility.length > 0 ? (
                internship.certificateEligibility.map((req, idx) => <li key={idx}>{req}</li>)
              ) : (
                <>
                  <li>Mentor check-ins and detailed feedback</li>
                  <li>Certificate with verification ID</li>
                  <li>Performance-based ranking</li>
                  <li>Access to team projects and hackathons</li>
                </>
              )}
            </ul>
            <div className="notice" style={{ marginTop: 16 }}>
              Enrollment is currently open. Seats are limited.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
