import { Link } from "react-router-dom"
import { useState } from "react"

export default function Home() {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Build Your Career with <span style={styles.brand}>SyncSaS</span>
      </h1>

      <p style={styles.subheading}>
        Learn. Apply. Earn. Grow.
      </p>

      <div style={styles.cardContainer}>
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.to}
            style={{
              ...styles.card,
              ...(hovered === index ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={styles.icon}>{card.icon}</div>
            <h2 style={styles.cardTitle}>{card.title}</h2>
            <p style={styles.cardDesc}>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ---------------- DATA ---------------- */
const cards = [
  {
    title: "Internships",
    icon: "🎓",
    desc: "Learn skills with real-world exposure & certification",
    to: "/internships",
  },
  {
    title: "Jobs",
    icon: "💼",
    desc: "Apply to jobs that match your skills & experience",
    to: "/jobs",
  },
  {
    title: "Freelancing",
    icon: "🧑‍💻",
    desc: "Work on gigs, earn money, build reputation",
    to: "/freelancing",
  },
]

/* ---------------- STYLES ---------------- */
const styles = {
  container: {
    minHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
  },

  heading: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  brand: {
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subheading: {
    fontSize: "18px",
    marginBottom: "50px",
    color: "#444",
  },

  cardContainer: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  card: {
    width: "280px",
    padding: "30px 25px",
    borderRadius: "16px",
    textDecoration: "none",
    color: "#222",
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    transition: "all 0.35s ease",
    border: "1px solid rgba(255,255,255,0.4)",
  },

  cardHover: {
    transform: "translateY(-12px) scale(1.03)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
  },

  icon: {
    fontSize: "48px",
    marginBottom: "15px",
  },

  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  cardDesc: {
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.6",
  },
}
