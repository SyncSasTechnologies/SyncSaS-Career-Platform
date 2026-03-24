import { Outlet, NavLink } from "react-router-dom"
import { useState } from "react"

export default function MentorLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "var(--bg)",
    }}>

      {/* ✅ YOUR ORIGINAL SIDEBAR — just made beautiful! */}
      <aside style={{
        width: collapsed ? "70px" : "240px",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        padding: "24px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        flexShrink: 0,
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}>

        {/* Sidebar Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          padding: "0 8px",
        }}>
          {!collapsed && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <img
                src="/logo.png"
                alt="SyncSaS"
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "contain",
                }}
              />
              <span style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--text-muted)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}>
                Mentor Panel
              </span>
            </div>
          )}

          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              width: "28px",
              height: "28px",
              cursor: "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* ✅ YOUR ORIGINAL LINKS — just made beautiful! */}
        {[
          { to: "/mentor",                    label: "Dashboard",         icon: "🏠", end: true },
          { to: "/mentor/internships",        label: "My Internships",    icon: "📚" },
          { to: "/mentor/internships/create", label: "Create Internship", icon: "➕" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={item.label}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 12px",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: isActive ? 700 : 500,
              background: isActive
                ? "linear-gradient(135deg, #6366F115, #8B5CF615)"
                : "transparent",
              color: isActive
                ? "var(--primary)"
                : "var(--text-muted)",
              border: isActive
                ? "1px solid #6366F130"
                : "1px solid transparent",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
              overflow: "hidden",
            })}
          >
            <span style={{ fontSize: "18px", flexShrink: 0 }}>
              {item.icon}
            </span>
            {!collapsed && item.label}
          </NavLink>
        ))}

      </aside>

      {/* ✅ YOUR ORIGINAL MAIN CONTENT — just styled! */}
      <main style={{
        flex: 1,
        padding: "32px",
        overflowY: "auto",
        background: "var(--bg)",
      }}>
        <Outlet />
      </main>

    </div>
  )
}