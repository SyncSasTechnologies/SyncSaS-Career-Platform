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

  // helper to highlight active link
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
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
    }}>

      {/* Logo */}
        <img
  src="/logo.png"
  alt="SyncSaS Logo"
  style={{
    height: "40px",
    width: "40px",
    objectFit: "contain",
  }}
/>
<span style={{
  fontSize: "20px",
  fontWeight: 800,
  color: "var(--text)",
}}>
  
</span>

      {/* Middle Links */}
      <div style={{ display: "flex", gap: "8px" }}>
        {[
          { label: "Home", path: "/" },
          { label: "Internships", path: "/internships" },
          { label: "Jobs", path: "/jobs" },
          { label: "Freelancing", path: "/freelancing" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: "7px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: isActive(item.path) ? 700 : 500,
              color: isActive(item.path)
                ? "var(--primary)"
                : "var(--text-muted)",
              background: isActive(item.path)
                ? "var(--primary)" + "15"
                : "transparent",
              transition: "all 0.2s",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {/* Dark mode button */}
        <button onClick={toggleTheme} style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          background: "var(--bg)",
          cursor: "pointer",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {isDark ? "☀️" : "🌙"}
        </button>

        {user ? (
          <>
            <Link to="/intern/dashboard" style={{
              padding: "7px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--text)",
            }}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              background: "var(--error)",
              color: "white",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              padding: "7px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--text)",
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              padding: "9px 22px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              color: "white",
              boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
            }}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}