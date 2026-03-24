export default function ProgressBar({ label, value, max = 100, color = "#6366F1" }) {

  const percent = Math.min((value / max) * 100, 100)

  return (
    <div style={{ marginBottom: "18px" }}>

      {/* Label and percentage */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
      }}>
        <span style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--text)",
        }}>
          {label}
        </span>
        <span style={{
          fontSize: "13px",
          fontWeight: 700,
          color: color,
        }}>
          {Math.round(percent)}%
        </span>
      </div>

      {/* Grey track */}
      <div style={{
        height: "8px",
        background: "var(--border)",
        borderRadius: "99px",
        overflow: "hidden",
      }}>
        {/* Colored fill */}
        <div style={{
          height: "100%",
          width: percent + "%",
          background: color,
          borderRadius: "99px",
          transition: "width 0.8s ease",
        }} />
      </div>

    </div>
  )
}