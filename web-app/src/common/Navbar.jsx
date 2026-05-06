
import { useState } from "react"
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { logoutUser } from "../auth/auth.service"
import "./navbar.css"

export default function Navbar({ variant = "intern" }) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate("/")
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  const handleToggle = () => setIsOpen((p) => !p)
  const handleClose = () => setIsOpen(false)

  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`

  const isActive = (path) => location.pathname === path

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
        >
          <span />
          <span />
          <span />
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

        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? "☀️" : "🌙"}
          </button>

          {user ? (
            <>
              <Link to="/intern/dashboard" className="btn-link">
                Dashboard
              </Link>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-link">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}