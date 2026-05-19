import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchInternshipById } from "../services/publicInternship.service"
import "../styles/public-pages.css"

export default function InternshipEnrollPage() {
  const { id } = useParams()
  const [internship, setInternship] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    education: "",
    college: "",
    degree: "",
    year: "",
    skills: ""
  })

  useEffect(() => {
    const load = async () => {
      const data = await fetchInternshipById(id)
      setInternship(data)
    }
    load()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="internship-page">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Enroll in Internship</h1>
            <p className="page-subtitle">Complete your profile to start your journey.</p>
          </div>
        </div>

        <div className="two-column">
          <div className="section">
            {submitted ? (
              <div>
                <h3 className="card-title">Enrollment submitted!</h3>
                <p className="card-text">We will review your details and notify you soon.</p>
                <div className="actions">
                  <a className="btn primary" href="/intern/dashboard">Go to Dashboard</a>
                  <a className="btn ghost" href="/intern/tasks">View Tasks</a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div>
                    <div className="label">Education</div>
                    <input className="input" name="education" value={form.education} onChange={handleChange} placeholder="B.Tech" required />
                  </div>
                  <div>
                    <div className="label">College / University</div>
                    <input className="input" name="college" value={form.college} onChange={handleChange} placeholder="Your college" required />
                  </div>
                  <div>
                    <div className="label">Degree</div>
                    <input className="input" name="degree" value={form.degree} onChange={handleChange} placeholder="CSE" required />
                  </div>
                  <div>
                    <div className="label">Year</div>
                    <input className="input" name="year" value={form.year} onChange={handleChange} placeholder="2027" required />
                  </div>
                  <div>
                    <div className="label">Skills</div>
                    <input className="input" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node, MongoDB" required />
                  </div>
                </div>

                <div className="notice" style={{ marginTop: 16 }}>
                  This is a public preview. Authentication will be required in production.
                </div>

                <div className="actions" style={{ marginTop: 16 }}>
                  <button className="btn primary" type="submit">Submit Enrollment</button>
                  <button className="btn secondary" type="button" onClick={() => setForm({ education: "", college: "", degree: "", year: "", skills: "" })}>
                    Reset
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="section">
            <h3 className="card-title">Internship Summary</h3>
            {internship ? (
              <>
                <p className="card-text">{internship.title}</p>
                <div className="card-meta">
                  <span>Duration: {internship.duration}</span>
                  <span>Level: {internship.level}</span>
                  <span>Tier: {internship.tier || "Basic"}</span>
                </div>
                <p className="card-text" style={{ marginTop: 12 }}>
                  {internship.description}
                </p>
                <ul className="list">
                  <li>Mentor guidance</li>
                  <li>Hands-on tasks</li>
                  <li>Certificate on completion</li>
                </ul>
              </>
            ) : (
              <p className="card-text">Loading internship details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
