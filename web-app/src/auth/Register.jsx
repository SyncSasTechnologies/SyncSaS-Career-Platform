import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"
import axios from "axios"

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  
  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // 1️⃣ Create Firebase user
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const firebaseUser = result.user
      const token = await firebaseUser.getIdToken()

      // 2️⃣ Save user in backend DB
      await axios.post(
        "http://localhost:5000/api/users/register",
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
      minHeight: "100vh",
      background: "linear-gradient(135deg, #EEF2FF, #F5F3FF)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "white",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: "0 20px 60px rgba(99,102,241,0.15)",
        border: "1px solid var(--border)",
      }}>

        {/* Logo on top */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img
  src="/logo.png"
  alt="SyncSaS Logo"
  style={{
    height: "60px",
    width: "60px",
    objectFit: "contain",
    margin: "0 auto 14px",
    display: "block",
  }}
/>
          <h1 style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "6px",
          }}>
            Join SyncSaS
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Create your free account today
          </p>
        </div>

        {/* Error message box */}
        {error && (
          <div style={{
            background: "#FEE2E2",
            color: "#DC2626",
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            marginBottom: "20px",
            border: "1px solid #FECACA",
          }}>
            ⚠️ {error}
          </div>
        )}

       
        <form onSubmit={handleRegister}>

          {/* Full Name */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "12px",
              border: "none",
              background: loading
                ? "#A5B4FC"
                : "linear-gradient(135deg, #6366F1, #8B5CF6)",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
              fontFamily: "inherit",
            }}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

        </form>

        {/* Login link */}
        <p style={{
          textAlign: "center",
          marginTop: "24px",
          fontSize: "14px",
          color: "var(--text-muted)",
        }}>
          Already have an account?{" "}
          <Link to="/login" style={{
            color: "var(--primary)",
            fontWeight: 700,
            textDecoration: "none",
          }}>
            Login Here
          </Link>
        </p>

      </div>
    </div>
  )
}