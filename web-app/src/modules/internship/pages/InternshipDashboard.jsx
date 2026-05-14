import { Link } from "react-router-dom"
import "../styles/dashboard.css"

export default function InternshipDashboard() {
  const stats = [
    { icon: "🎓", label: "Internships Enrolled", value: "0", color: "#0f766e" },
    { icon: "✅", label: "Completed", value: "0", color: "#10b981" },
    { icon: "⭐", label: "Points Earned", value: "0", color: "#f97316" },
    { icon: "📈", label: "Current Level", value: "Beginner", color: "#8b5cf6" }
  ]

  const sections = [
    {
      icon: "🔍",
      title: "Explore Internships",
      description: "Discover new internships and pick the best fit for your goals.",
      cta: "Browse Internships",
      link: "/internships/browse"
    },
    {
      icon: "📋",
      title: "View My Tasks",
      description: "Track assignments and deadlines for enrolled internships.",
      cta: "Open Tasks",
      link: "/intern/tasks"
    },
    {
      icon: "🏆",
      title: "My Certificates",
      description: "View certificates earned and eligibility status.",
      cta: "View Certificates",
      link: "/intern/certificate"
    },
    {
      icon: "💬",
      title: "Mentor Feedback",
      description: "Read comments and guidance from your mentors.",
      cta: "Check Feedback",
      link: "/intern/feedback"
    },
    {
      icon: "📊",
      title: "Progress Analytics",
      description: "Monitor your performance and improvement over time.",
      cta: "View Analytics",
      link: "/intern/progress"
    },
    {
      icon: "📚",
      title: "Resources",
      description: "Access learning materials and guides for your internship.",
      cta: "Open Library",
      link: "/intern/resources"
    }
  ]


  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Internship Dashboard</h1>
          <p className="dashboard-subtitle">Start your journey, track progress, and grow your skills</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Empty State CTA */}
      <div className="empty-state-cta">
        <div className="empty-state-icon">🚀</div>
        <h2>Get Started</h2>
        <p>You haven't enrolled in any internships yet. Explore available opportunities and start learning today!</p>
        <Link to="/internships/browse" className="btn-primary-large">
          Browse Internships
        </Link>
      </div>

      {/* Action Cards Grid */}
      <div className="actions-grid">
        {sections.map((section, idx) => (
          <div key={idx} className="action-card">
            <div className="action-icon">{section.icon}</div>
            <h3 className="action-title">{section.title}</h3>
            <p className="action-description">{section.description}</p>
            <Link to={section.link} className="action-link">
              {section.cta} →
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="quick-tips">
        <h3>💡 Quick Tips</h3>
        <ul>
          <li>Complete all level tasks to unlock certificates</li>
          <li>Request mentor feedback on your submissions</li>
          <li>Track your performance score on the analytics page</li>
          <li>Access learning resources anytime for support</li>
        </ul>
      </div>
    </div>
  )
}
