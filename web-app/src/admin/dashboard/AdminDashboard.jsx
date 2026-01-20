export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Platform overview</p>

      <div style={styles.grid}>
        <Card title="Total Users" value="—" />
        <Card title="Active Internships" value="—" />
        <Card title="Jobs Posted" value="—" />
        <Card title="Active Gigs" value="—" />
      </div>

      <p style={{ marginTop: "20px", color: "#666" }}>
        (Live data will appear once APIs are connected)
      </p>
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.value}>{value}</p>
    </div>
  )
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  value: {
    fontSize: "24px",
    fontWeight: "bold",
  },
}
