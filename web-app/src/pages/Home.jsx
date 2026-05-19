import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { gigService } from "../modules/freelance/services/gig.service"
import "../styles/home.css"

const audienceCards = [
  {
    title: "For Interns",
    description: "Apply to mentor-led internships and build real experience with structured guidance.",
  },
  {
    title: "For Mentors",
    description: "Post internships, review work, and guide talent through practical projects.",
  },
  {
    title: "For Freelancers",
    description: "Find short-term gigs, pitch your skills, and grow your portfolio with live work.",
  },
]

function formatBudget(budget) {
  if (!budget) return "Budget on request"

  const min = budget.min ?? "—"
  const max = budget.max ?? "—"

  return `$${min} - $${max}`
}

export default function Home() {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await gigService.getAllGigs({ limit: 3 })
        setGigs(Array.isArray(data) ? data : [])
      } catch (err) {
        console.warn("Failed to load latest gigs", err)
        setGigs([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <span className="home-hero__eyebrow">SyncSaS Career Portal</span>
          <h1>Build experience through internships, gigs, and mentor-led work.</h1>
          <p className="home-hero__text">
            Explore a cleaner way to discover opportunities, connect with mentors, and move from learning to paid
            work with confidence.
          </p>

          <div className="home-hero__actions">
            <Link to="/internships" className="home-btn home-btn--primary">
              Browse Internships
            </Link>
            <Link to="/freelance/gigs" className="home-btn home-btn--secondary">
              Browse Gigs
            </Link>
          </div>

          <div className="home-hero__stats">
            <div className="home-stat">
              <strong>3</strong>
              <span>career paths in one place</span>
            </div>
            <div className="home-stat">
              <strong>Mentor-led</strong>
              <span>guidance for internships and review</span>
            </div>
            <div className="home-stat">
              <strong>Live gigs</strong>
              <span>fresh freelance work with clear budgets</span>
            </div>
          </div>
        </div>

        <div className="home-hero__panel">
          <div className="home-panel-card home-panel-card--accent">
            <span className="home-panel-card__label">Featured today</span>
            <h2>Discover opportunities that match your next step.</h2>
            <p>
              A streamlined space for interns, mentors, and freelancers to find the right work without clutter.
            </p>
          </div>

          <div className="home-panel-card">
            <div className="home-panel-list">
              <div>
                <strong>Clear browsing</strong>
                <span>Find internships and gigs quickly.</span>
              </div>
              <div>
                <strong>Practical growth</strong>
                <span>Work on tasks that build your portfolio.</span>
              </div>
              <div>
                <strong>Structured support</strong>
                <span>Get mentor feedback where it matters.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <span className="home-section__eyebrow">Who it’s for</span>
          <h2>One portal, built for every path.</h2>
        </div>

        <div className="home-grid home-grid--audience">
          {audienceCards.map((card) => (
            <article key={card.title} className="home-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-section--gigs">
        <div className="home-section__heading home-section__heading--split">
          <div>
            <span className="home-section__eyebrow">Latest gigs</span>
            <h2>Fresh opportunities worth checking first.</h2>
          </div>
          <Link to="/freelance/gigs" className="home-link">
            View all gigs
          </Link>
        </div>

        {loading && <div className="home-state-card">Loading latest gigs...</div>}

        {!loading && gigs.length === 0 && (
          <div className="home-state-card">
            No gigs are available right now. Check back soon for new freelance opportunities.
          </div>
        )}

        <div className="home-grid home-grid--gigs">
          {gigs.map((g) => (
            <article key={g._id} className="home-gig-card">
              <div className="home-gig-card__top">
                <span className="home-gig-card__badge">{g.category || "General"}</span>
                <h3>{g.title}</h3>
              </div>

              <p>{g.shortDescription || g.description?.slice(0, 120)}</p>

              <div className="home-gig-card__footer">
                <span className="home-gig-card__budget">{formatBudget(g.budget)}</span>
                <Link to={`/freelance/gig/${g._id}`} className="home-btn home-btn--small home-btn--secondary">
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
