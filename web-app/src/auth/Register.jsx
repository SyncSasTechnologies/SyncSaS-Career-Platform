import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

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
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  )
}
