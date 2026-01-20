import { NavLink } from "react-router-dom"

export default function AdminSidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>SyncSaS Admin</h2>

      <nav>
        <Section title="Dashboard">
          <Item to="/admin">Overview</Item>
        </Section>

        <Section title="Users">
          <Item to="/admin/users">All Users</Item>
          <Item to="/admin/users/interns">Interns</Item>
          <Item to="/admin/users/mentors">Mentors</Item>
          <Item to="/admin/users/employers">Employers</Item>
          <Item to="/admin/users/freelancers">Freelancers</Item>
        </Section>

        <Section title="Internship Platform">
          <Item to="/admin/internships">Internships</Item>
          <Item to="/admin/enrollments">Enrollments</Item>
          <Item to="/admin/tasks">Tasks</Item>
          <Item to="/admin/submissions">Submissions</Item>
          <Item to="/admin/certificates">Certificates</Item>
        </Section>

        <Section title="Job Platform">
          <Item to="/admin/jobs">Job Listings</Item>
          <Item to="/admin/companies">Companies</Item>
        </Section>

        <Section title="Freelancing Platform">
          <Item to="/admin/gigs">Gigs</Item>
          <Item to="/admin/proposals">Proposals</Item>
          <Item to="/admin/reviews">Reviews</Item>
        </Section>

        <Section title="System">
          <Item to="/admin/analytics">Analytics</Item>
          <Item to="/admin/settings">Settings</Item>
        </Section>
      </nav>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h4 style={styles.sectionTitle}>{title}</h4>
      {children}
    </div>
  )
}

function Item({ to, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.link,
        background: isActive ? "#333" : "transparent",
      })}
    >
      {children}
    </NavLink>
  )
}

const styles = {
  sidebar: {
    width: "260px",
    background: "#1e1e1e",
    color: "#fff",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
    fontSize: "20px",
  },
  sectionTitle: {
    fontSize: "13px",
    color: "#aaa",
    marginBottom: "8px",
  },
  link: {
    display: "block",
    padding: "8px 10px",
    marginBottom: "6px",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    fontSize: "14px",
  },
}
