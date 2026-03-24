import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { fetchPublicInternships } from "../services/publicInternship.service"
import "../styles/public-pages.css"

export default function InternshipBrowse() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [tierFilter, setTierFilter] = useState("all")

  useEffect(() => {
    const load = async () => {
      const data = await fetchPublicInternships()
      setInternships(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    return internships.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase())
      const matchesTier = tierFilter === "all" || item.tier?.toLowerCase() === tierFilter
      return matchesQuery && matchesTier
    })
  }, [internships, query, tierFilter])

  return (
    <div className="internship-page">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Browse Internships</h1>
            <p className="page-subtitle">Discover internships and pick the best fit.</p>
          </div>
          <div className="toolbar">
            <input
              className="search-input"
              placeholder="Search internships"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="select-input"
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
            >
              <option value="all">All Tiers</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="card">
            <p className="card-text">Loading internships...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="card">
            <p className="card-text">No internships match your search.</p>
          </div>
        )}

        <div className="card-grid">
          {filtered.map((internship) => (
            <div key={internship._id} className="card">
              <div className="actions" style={{ justifyContent: "space-between" }}>
                <h3 className="card-title">{internship.title}</h3>
                <span className={`badge ${internship.tier?.toLowerCase() || "basic"}`}>
                  {internship.tier || "Basic"}
                </span>
              </div>
              <p className="card-text">{internship.description}</p>
              <div className="card-meta">
                <span>Duration: {internship.duration}</span>
                <span>Level: {internship.level}</span>
                <span>Mode: {internship.mode || "Remote"}</span>
              </div>
              <div className="actions" style={{ marginTop: 14 }}>
                <Link className="btn ghost" to={`/internships/${internship._id}`}>
                  View Details
                </Link>
                <Link className="btn primary" to={`/internships/enroll/${internship._id}`}>
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
