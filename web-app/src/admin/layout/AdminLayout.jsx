import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"

export default function AdminLayout() {
  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
    background: "#f9f9f9",
  },
}
