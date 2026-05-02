import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { gigService } from "./services/gig.service"
import "./styles/GigList.css"

const CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Design",
  "Writing",
  "Marketing",
  "Data Analysis",
  "Video Editing",
  "AI & Machine Learning",
  "Cloud Computing",
  "DevOps",
]

export default function GigList() {
  const navigate = useNavigate()
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("newest")
  const [viewType, setViewType] = useState("grid")
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minBudget: "",
    maxBudget: "",
  })

  useEffect(() => {
    fetchGigs()
  }, [filters])

  const fetchGigs = async () => {
    try {
      setLoading(true)
      setError(null)
      const filterParams = {}
      if (filters.search) filterParams.search = filters.search
      if (filters.category) filterParams.category = filters.category
      if (filters.minBudget) filterParams.minBudget = filters.minBudget
      if (filters.maxBudget) filterParams.maxBudget = filters.maxBudget

      const data = await gigService.getAllGigs(filterParams)
      setGigs(data || [])
    } catch (error) {
      console.error("Error fetching gigs:", error)
      setError("Failed to load gigs. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "",
      minBudget: "",
      maxBudget: "",
    })
  }

  const sortedGigs = [...gigs].sort((a, b) => {
    switch (sortBy) {
      case "budget-high":
        return b.budget.max - a.budget.max
      case "budget-low":
        return a.budget.min - b.budget.min
      case "rating":
        return b.freelancerRating - a.freelancerRating
      case "popular":
        return b.views - a.views
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const renderGigCard = (gig) => (
    <div key={gig._id} className="gig-card" onClick={() => navigate(`/freelance/gig/${gig._id}`)}>
      <div className="gig-image-container">
        {gig.image ? (
          <img src={gig.image} alt={gig.title} className="gig-image" />
        ) : (
          <div className="gig-image-placeholder">
            <div className="placeholder-icon">📋</div>
          </div>
        )}
        <div className="gig-badge">{gig.category}</div>
      </div>

      <div className="gig-content">
        <h3 className="gig-title">{gig.title}</h3>

        <p className="gig-description">{gig.description.substring(0, 100)}...</p>

        {gig.skills && gig.skills.length > 0 && (
          <div className="gig-skills">
            {gig.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="skill-tag">
                {skill}
              </span>
            ))}
            {gig.skills.length > 3 && <span className="skill-tag">+{gig.skills.length - 3}</span>}
          </div>
        )}

        <div className="gig-freelancer">
          {gig.freelancerImage ? (
            <img src={gig.freelancerImage} alt={gig.freelancerName} className="freelancer-avatar" />
          ) : (
            <div className="freelancer-avatar-placeholder">{gig.freelancerName.charAt(0)}</div>
          )}
          <div className="freelancer-info">
            <p className="freelancer-name">{gig.freelancerName}</p>
            <p className="freelancer-rating">
              <span className="stars">⭐ {gig.freelancerRating.toFixed(1)}</span>
              <span className="reviews">({gig.freelancerReviews})</span>
            </p>
          </div>
        </div>

        <div className="gig-divider"></div>

        <div className="gig-footer">
          <div className="gig-budget-section">
            <span className="budget-label">Budget</span>
            <span className="budget-amount">${gig.budget.min} - ${gig.budget.max}</span>
          </div>
          <div className="gig-stats">
            <span className="stat" title="Proposals">
              📧 {gig.proposals}
            </span>
            <span className="stat" title="Views">
              👁️ {gig.views}
            </span>
            {gig.deliveryTime && (
              <span className="stat" title="Delivery Time">
                ⏱️ {gig.deliveryTime}d
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="gig-list-page">
      {/* Header Section */}
      <div className="gig-list-header-section">
        <div className="header-content">
          <div>
            <h1 className="page-title">Freelance Gigs Marketplace</h1>
            <p className="page-subtitle">Browse and explore high-quality freelance opportunities</p>
          </div>
          <button className="btn-create-gig-primary" onClick={() => navigate("/freelance/create-gig")}>
            <span className="btn-icon">+</span> Post a Gig
          </button>
        </div>
      </div>

      <div className="gig-list-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="reset-filters-btn" onClick={handleResetFilters}>
              Reset
            </button>
          </div>

          <div className="filter-group">
            <label className="filter-label">Search</label>
            <input
              type="text"
              name="search"
              placeholder="Search gigs..."
              value={filters.search}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange} className="filter-select">
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Budget Range</label>
            <div className="budget-inputs">
              <input
                type="number"
                name="minBudget"
                placeholder="Min"
                value={filters.minBudget}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <span className="budget-separator">-</span>
              <input
                type="number"
                name="maxBudget"
                placeholder="Max"
                value={filters.maxBudget}
                onChange={handleFilterChange}
                className="filter-input"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="gig-content-area">
          {/* Toolbar */}
          <div className="gig-toolbar">
            <div className="toolbar-left">
              <span className="gig-count">{sortedGigs.length} gigs available</span>
            </div>
            <div className="toolbar-right">
              <div className="sort-control">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="newest">Newest</option>
                  <option value="budget-high">Budget: High to Low</option>
                  <option value="budget-low">Budget: Low to High</option>
                  <option value="rating">Top Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewType === "grid" ? "active" : ""}`}
                  onClick={() => setViewType("grid")}
                  title="Grid view"
                >
                  ⊞
                </button>
                <button
                  className={`view-btn ${viewType === "list" ? "active" : ""}`}
                  onClick={() => setViewType("list")}
                  title="List view"
                >
                  ≡
                </button>
              </div>
            </div>
          </div>

          {/* Gigs Display */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading gigs...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <p>{error}</p>
              <button onClick={fetchGigs} className="retry-btn">
                Try Again
              </button>
            </div>
          ) : sortedGigs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No gigs found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button onClick={handleResetFilters} className="reset-btn">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={`gig-display ${viewType === "grid" ? "gig-grid" : "gig-list-view"}`}>
              {sortedGigs.map((gig) => renderGigCard(gig))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
