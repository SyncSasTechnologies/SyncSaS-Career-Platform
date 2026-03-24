export default function StatsCard({ icon, label, value, color = "#6366F1" }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flex: 1,
      minWidth: "160px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}>

      {/* Icon box */}
      <div style={{
        width: "52px",
        height: "52px",
        borderRadius: "14px",
        background: color + "20",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Number and label */}
      <div>
        <div style={{
          fontSize: "26px",
          fontWeight: 800,
          color: "var(--text)",
          lineHeight: 1,
          marginBottom: "4px",
        }}>
          {value}
        </div>
        <div style={{
          fontSize: "13px",
          color: "var(--text-muted)",
          fontWeight: 500,
        }}>
          {label}
        </div>
      </div>

    </div>
  )
}