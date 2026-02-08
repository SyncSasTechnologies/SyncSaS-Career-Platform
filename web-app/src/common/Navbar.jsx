import { NavLink } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { logoutUser } from "../auth/auth.service"
import { useState } from "react"
import "./navbar.css"

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
      </div>
    </nav>
  )
}
