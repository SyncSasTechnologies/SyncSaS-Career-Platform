import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginWithEmail, loginWithGoogle } from "./auth.service"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  
  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await loginWithEmail(email, password)
      navigate("/intern/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  
  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate("/intern/dashboard")
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
            Welcome Back!
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Login to your SyncSaS account
          </p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "11px",
            borderRadius: "10px",
            border: "1.5px solid var(--border)",
            background: "white",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--text)",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
            fontFamily: "inherit",
          }}
        >
          {/* Google icon */}
          <img
            src="https://www.google.com/favicon.ico"
            width="18"
            height="18"
            alt="Google"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            or login with email
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        {/* Error message */}
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

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin}>

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
              placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Login →"}
          </button>

        </form>

        {/* Register link */}
        <p style={{
          textAlign: "center",
          marginTop: "24px",
          fontSize: "14px",
          color: "var(--text-muted)",
        }}>
          Don't have an account?{" "}
          <Link to="/register" style={{
            color: "var(--primary)",
            fontWeight: 700,
            textDecoration: "none",
          }}>
            Register Free
          </Link>
        </p>

      </div>
    </div>
  )
}