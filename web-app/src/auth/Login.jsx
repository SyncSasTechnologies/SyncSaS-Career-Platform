import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
      navigate("/dashboard")
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
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <br />

      <button onClick={handleGoogleLogin} disabled={loading}>
        Login with Google
      </button>
    </div>
  )
}
