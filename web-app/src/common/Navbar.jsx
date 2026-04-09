import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { logoutUser } from "../auth/auth.service"
import { useTheme } from "../context/ThemeContext"

export default function Navbar() {
  const { user } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logoutUser()
    navigate("/")
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 48px",
      height: "64px",
      background: isDark
        ? "rgba(15,23,42,0.95)"
        : "rgba(255,255,255,0.95)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>

      {/* Logo */}
      <img src="/logo.png" alt="logo" style={{ height: "40px" }} />

      {/* Links */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/" style={{ color: isActive("/") ? "blue" : "gray" }}>Home</Link>
        <Link to="/freelancer/dashboard" style={{ color: isActive("/freelancer/dashboard") ? "blue" : "gray" }}>Dashboard</Link>
        <Link to="/freelancer/profile" style={{ color: isActive("/freelancer/profile") ? "blue" : "gray" }}>Profile</Link>
        <Link to="/freelancer/skills" style={{ color: isActive("/freelancer/skills") ? "blue" : "gray" }}>Skills</Link>
      </div>

      {/* Right */}
      <div style={{ display: "flex", gap: "10px" }}>

        <button onClick={toggleTheme}>
          {isDark ? "☀️" : "🌙"}
        </button>

        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

    </nav>
  )
}