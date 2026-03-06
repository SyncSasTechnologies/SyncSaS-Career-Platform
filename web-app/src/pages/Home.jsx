import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Home() {
  const [hovered, setHovered] = useState(null)
  const [stats, setStats] = useState({
    internships: 0,
    students: 0,
    mentors: 0,
    placement: 0,
  })

  // Counting animation for stats
  useEffect(() => {
    const targets = {
      internships: 500,
      students: 2000,
      mentors: 150,
      placement: 95,
    }
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let current = { internships: 0, students: 0, mentors: 0, placement: 0 }

    const timer = setInterval(() => {
      let allDone = true
      const updated = { ...current }

      Object.keys(targets).forEach(key => {
        if (current[key] < targets[key]) {
          updated[key] = Math.min(
            current[key] + Math.ceil(targets[key] / steps),
            targets[key]
          )
          allDone = false
        }
      })

      current = updated
      setStats({ ...updated })
      if (allDone) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Hero Section */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 20px 80px",
        textAlign: "center",
        background: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #FDF4FF 100%)",
      }}>

        {/* Background circles for decoration */}
        <div style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366F120, #8B5CF620)",
          zIndex: 0,
        }} />
        <div style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #F59E0B20, #EF444420)",
          zIndex: 0,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Top badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "99px",
            padding: "6px 18px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--primary)",
            marginBottom: "28px",
            boxShadow: "0 2px 10px rgba(99,102,241,0.15)",
          }}>
            🚀 One Of The Best Career Platform
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: "56px",
            fontWeight: 900,
            color: "var(--text)",
            marginBottom: "20px",
            lineHeight: 1.15,
            maxWidth: "700px",
            margin: "0 auto 20px",
          }}>
            Launch Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Dream Career
            </span>
            {" "}Today
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: "18px",
            color: "var(--text-muted)",
            maxWidth: "520px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}>
            Internships. Jobs. Freelancing. Everything you need to go from
            student to professional — all in one place.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}>
            <Link to="/internships" style={{
              padding: "14px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 700,
              color: "white",
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              boxShadow: "0 8px 25px rgba(99,102,241,0.45)",
              transition: "all 0.3s",
            }}>
              Explore Internships 🎓
            </Link>
            <Link to="/register" style={{
              padding: "14px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--primary)",
              background: "white",
              border: "2px solid var(--primary)",
              transition: "all 0.3s",
            }}>
              Join for Free ✨
            </Link>
          </div>

          {/* Small trust text */}
          <p style={{
            fontSize: "13px",
            color: "var(--text-muted)",
          }}>
            ✅ Free to join &nbsp;·&nbsp; ✅ No credit card &nbsp;·&nbsp; ✅ Get certified
          </p>
        </div>
      </div>

      {/* Stats Section — numbers count up automatically */}
      <div style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "40px 20px",
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "30px",
        }}>
          {[
            { value: stats.internships, label: "Internships", suffix: "+", icon: "🎓" },
            { value: stats.students, label: "Students", suffix: "+", icon: "👩‍🎓" },
            { value: stats.mentors, label: "Expert Mentors", suffix: "+", icon: "👨‍🏫" },
            { value: stats.placement, label: "Placement Rate", suffix: "%", icon: "🏆" },
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: "center",
              padding: "10px 20px",
            }}>
              <div style={{ fontSize: "28px", marginBottom: "4px" }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: "38px",
                fontWeight: 900,
                color: "var(--primary)",
                lineHeight: 1,
                marginBottom: "6px",
              }}>
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "70px 20px",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "36px",
          fontWeight: 800,
          color: "var(--text)",
          marginBottom: "12px",
        }}>
          Everything You Need 🚀
        </h2>
        <p style={{
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "16px",
          marginBottom: "48px",
        }}>
          One platform for your entire career journey
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}>
          {[
            {
              icon: "🎓",
              title: "Internships",
              desc: "Work on real projects with top companies. Get mentored and earn a verified certificate.",
              to: "/internships",
              color: "#6366F1",
              bg: "#EEF2FF",
            },
            {
              icon: "💼",
              title: "Jobs",
              desc: "Apply to curated job listings that match your skills. Get hired faster with your SyncSaS profile.",
              to: "/jobs",
              color: "#F59E0B",
              bg: "#FFF7ED",
            },
            {
              icon: "🧑‍💻",
              title: "Freelancing",
              desc: "Pick up gigs, build your portfolio and earn money while studying. Real clients, real projects.",
              to: "/freelancing",
              color: "#10B981",
              bg: "#F0FDF4",
            },
          ].map((card, i) => (
            <Link
              key={i}
              to={card.to}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "32px",
                borderRadius: "20px",
                textDecoration: "none",
                background: hovered === i ? card.color : card.bg,
                border: `1px solid ${card.color}30`,
                transition: "all 0.3s ease",
                transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                boxShadow: hovered === i
                  ? `0 20px 40px ${card.color}40`
                  : "0 2px 12px rgba(0,0,0,0.04)",
                display: "block",
              }}
            >
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: hovered === i ? "rgba(255,255,255,0.2)" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "10px",
                color: hovered === i ? "white" : "var(--text)",
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: hovered === i ? "rgba(255,255,255,0.85)" : "var(--text-muted)",
                marginBottom: "20px",
              }}>
                {card.desc}
              </p>
              <span style={{
                fontSize: "14px",
                fontWeight: 600,
                color: hovered === i ? "white" : card.color,
              }}>
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "30px 20px",
        textAlign: "center",
      }}>
        <img
            src="/logo.png"
            alt="SyncSaS Logo"
            style={{
              height: "32px",
              width: "32px",
              objectFit: "contain",
            }}
          />
        <p style={{
          color: "var(--text-muted)",
          fontSize: "14px",
        }}>

          © 2025 SyncSaS Technologies. Made with ❤️ for students.
        </p>
      </div>

    </div>
  )
}