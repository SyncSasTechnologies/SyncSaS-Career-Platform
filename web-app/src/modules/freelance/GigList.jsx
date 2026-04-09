import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { gigService } from "./services/gig.service"
import "./styles/GigList.css"

export default function GigList() {
  const navigate = useNavigate()
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
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
      const filterParams = {}
      if (filters.search) filterParams.search = filters.search
      if (filters.category) filterParams.category = filters.category
      if (filters.minBudget) filterParams.minBudget = filters.minBudget
      if (filters.maxBudget) filterParams.maxBudget = filters.maxBudget

      const data = await gigService.getAllGigs(filterParams)
      setGigs(data)
    } catch (error) {
      console.error("Error fetching gigs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="gig-list-container">
      <div className="gig-list-header">
        <h1>Browse Freelance Gigs</h1>
        <button className="btn-create-gig" onClick={() => navigate("/freelance/create-gig")}>
          + Create Gig
        </button>
      </div>

      {/* Filters */}
      <div className="gig-filters">
        <input
          type="text"
          name="search"
          placeholder="Search gigs..."
          value={filters.search}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Marketing">Marketing</option>
          <option value="Data Analysis">Data Analysis</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          name="minBudget"
          placeholder="Min Budget"
          value={filters.minBudget}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="number"
          name="maxBudget"
          placeholder="Max Budget"
          value={filters.maxBudget}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>

      {/* Gig Grid */}
      {loading ? (
        <p className="loading">Loading gigs...</p>
      ) : gigs.length === 0 ? (
        <p className="no-gigs">No gigs found. Try adjusting your filters.</p>
      ) : (
        <div className="gig-grid">
          {gigs.map((gig) => (
            <div key={gig._id} className="gig-card" onClick={() => navigate(`/freelance/gig/${gig._id}`)}>
              {gig.image && <img src={gig.image} alt={gig.title} className="gig-image" />}
              <div className="gig-content">
                <h3>{gig.title}</h3>
                <p className="gig-category">{gig.category}</p>
                <p className="gig-description">{gig.description.substring(0, 80)}...</p>

                <div className="gig-freelancer">
                  {gig.freelancerImage && (
                    <img src={gig.freelancerImage} alt={gig.freelancerName} className="freelancer-image" />
                  )}
                  <div>
                    <p className="freelancer-name">{gig.freelancerName}</p>
                    <p className="freelancer-rating">⭐ {gig.freelancerRating.toFixed(1)} ({gig.freelancerReviews} reviews)</p>
                  </div>
                </div>

                <div className="gig-footer">
                  <div className="gig-budget">
                    ${gig.budget.min} - ${gig.budget.max}
                  </div>
                  <div className="gig-meta">
                    <span>{gig.proposals} proposals</span>
                    <span>{gig.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
