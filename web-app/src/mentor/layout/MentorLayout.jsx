import { Outlet, Link } from "react-router-dom"

export default function MentorLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", background: "#1e1e1e", color: "#fff", padding: "20px" }}>
        <h3>Mentor Panel</h3>

        <nav style={{ marginTop: "20px" }}>
          <Link to="/mentor/internships" style={linkStyle}>
            My Internships
          </Link>
          <Link to="/mentor/internships/create" style={linkStyle}>
            Create Internship
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  )
}

const linkStyle = {
  display: "block",
  color: "#fff",
  marginBottom: "10px",
  textDecoration: "none",
}
