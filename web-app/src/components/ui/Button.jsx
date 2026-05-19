export default function Button({ 
  children,             // text inside button
  variant = "primary",  // style: "primary", "outline", "danger"
  size = "md",          // size: "sm", "md", "lg"
  onClick,              // what happens on click
  disabled = false      // is button clickable?
}) {

  // Button color styles
  const variants = {
    primary: {
      background: "var(--primary)",
      color: "white",
      border: "none",
    },
    outline: {
      background: "transparent",
      color: "var(--primary)",
      border: "2px solid var(--primary)",
    },
    danger: {
      background: "var(--error)",
      color: "white",
      border: "none",
    },
  }

  // Button size styles
  const sizes = {
    sm: { padding: "6px 14px",  fontSize: "13px" },
    md: { padding: "10px 22px", fontSize: "15px" },
    lg: { padding: "14px 30px", fontSize: "17px" },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: "var(--radius)",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "inherit",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  )
}