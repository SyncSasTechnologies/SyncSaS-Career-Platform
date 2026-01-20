import { Link } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { logoutUser } from "../auth/auth.service"

export default function Navbar() {
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}

      {user ? (
        <>
          <span>{user.email}</span> |{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
          <Link to="/internships">Internships</Link> |

        </>
      )}
    </nav>
  )
}
