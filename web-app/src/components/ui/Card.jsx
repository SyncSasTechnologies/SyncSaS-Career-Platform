export default function Card({ 
  children,    // content inside the card
  padding,     // custom padding if needed
}) {

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: padding || "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {children}
    </div>
  )
}