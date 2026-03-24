import { useState } from "react"
import { createInternship } from "../services/mentorInternship.service"
import { useNavigate } from "react-router-dom"

export default function CreateInternship() {
  const navigate = useNavigate()

  
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
  })

  const [loading, setLoading] = useState(false)

  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await createInternship(form)
    navigate("/mentor/internships")
  }

 
  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    fontSize: "15px",
    color: "var(--text)",
    background: "var(--bg)",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  }

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "6px",
  }

  return (
    <div style={{
      background: "var(--bg)",
      minHeight: "100vh",
    }}>

      
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "26px",
          fontWeight: 800,
          color: "var(--text)",
          marginBottom: "4px",
        }}>
          Create Internship ➕
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Fill in the details to create a new internship
        </p>
      </div>

      
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "32px",
        maxWidth: "600px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>

        
        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>
              Internship Title
            </label>
            <input
              name="title"
              placeholder="e.g. Full Stack Development"
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe what interns will learn and do..."
              onChange={handleChange}
              required
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />
          </div>

         
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "28px",
          }}>

            
            <div>
              <label style={labelStyle}>
                Duration
              </label>
              <input
                name="duration"
                placeholder="e.g. 3 months"
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            
            <div>
              <label style={labelStyle}>
                Level
              </label>
              <select
                name="level"
                onChange={handleChange}
                required
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                }}
              >
                <option value="">Select Level</option>
                <option value="Level 1">Level 1 — Beginner</option>
                <option value="Level 2">Level 2 — Intermediate</option>
                <option value="Level 3">Level 3 — Advanced</option>
              </select>
            </div>

          </div>

          
          <div style={{
            display: "flex",
            gap: "12px",
          }}>

            
            <button
              type="button"
              onClick={() => navigate("/mentor/internships")}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "1.5px solid var(--border)",
                background: "transparent",
                color: "var(--text)",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>

            
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 2,
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: loading
                  ? "#A5B4FC"
                  : "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: "white",
                fontWeight: 700,
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
              }}
            >
              {loading ? "Saving..." : "💾 Save Draft"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}