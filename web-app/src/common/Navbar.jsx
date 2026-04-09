
import { NavLink } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { logoutUser } from "../auth/auth.service"
import { useState } from "react"
import "./navbar.css"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { logoutUser } from "../auth/auth.service"
import { useTheme } from "../context/ThemeContext"


export default function Navbar({ variant = "intern" }) {
  const { user } = useAuth()

  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutUser()
      setIsOpen(false)
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  const handleToggle = () => setIsOpen((prev) => !prev)
  const handleClose = () => setIsOpen(false)

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="brand" onClick={handleClose}>
          <span className="brand-mark">SyncSaS</span>
          <span className="brand-sub">Career Portal</span>
        </NavLink>

        <button
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={handleToggle}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {variant === "public" ? (
            <>
              <div className="nav-group">
                <NavLink to="/" className={navLinkClass} onClick={handleClose}>
                  Home
                </NavLink>
              </div>
              <div className="nav-group nav-actions">
                <NavLink to="/login" className={navLinkClass} onClick={handleClose}>
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-primary" onClick={handleClose}>
                  Register
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="nav-group">
                <NavLink to="/" className={navLinkClass} onClick={handleClose}>
                  Home
                </NavLink>
                <NavLink to="/internships" className={navLinkClass} onClick={handleClose}>
                  Dashboard
                </NavLink>
                <NavLink to="/internships/browse" className={navLinkClass} onClick={handleClose}>
                  Browse
                </NavLink>
                <NavLink to="/intern/overview" className={navLinkClass} onClick={handleClose}>
                  Overview
                </NavLink>
              </div>

              <div className="nav-group">
                <NavLink to="/intern/tasks" className={navLinkClass} onClick={handleClose}>
                  Tasks
                </NavLink>
                <NavLink to="/intern/certificate" className={navLinkClass} onClick={handleClose}>
                  Certificate
                </NavLink>
                <NavLink to="/intern/resources" className={navLinkClass} onClick={handleClose}>
                  Resources
                </NavLink>
                <NavLink to="/intern/progress" className={navLinkClass} onClick={handleClose}>
                  Progress
                </NavLink>
                <NavLink to="/intern/feedback" className={navLinkClass} onClick={handleClose}>
                  Feedback
                </NavLink>
              </div>

              <div className="nav-group nav-actions">
                {user ? (
                  <>
                    <span className="user-pill">{user.email}</span>
                    <button className="btn-ghost" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={navLinkClass} onClick={handleClose}>
                      Login
                    </NavLink>
                    <NavLink to="/register" className="btn-primary" onClick={handleClose}>
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </>
          )}
        </div>

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