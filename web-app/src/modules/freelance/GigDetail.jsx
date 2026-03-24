import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { gigService } from "./services/gig.service"
import { useRole } from "../../hooks/useRole"
import "./styles/GigDetail.css"

export default function GigDetail() {
  const { gigId } = useParams()
  const navigate = useNavigate()
  const { user } = useRole()
  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchGigDetail()
  }, [gigId])

  const fetchGigDetail = async () => {
    try {
      setLoading(true)
      const data = await gigService.getGigById(gigId)
      setGig(data)
    } catch (err) {
      setError("Failed to load gig details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSendProposal = () => {
    if (!user) {
      navigate("/login")
      return
    }
    navigate(`/freelance/proposal/${gigId}`)
  }

  const handleEditGig = () => {
    navigate(`/freelance/edit-gig/${gigId}`)
  }

  const handleDeleteGig = async () => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      try {
        await gigService.deleteGig(gigId)
        navigate("/freelance")
      } catch (error) {
        alert("Failed to delete gig")
        console.error(error)
      }
    }
  }

  if (loading) return <p className="loading">Loading gig details...</p>
  if (error) return <p className="error">{error}</p>
  if (!gig) return <p className="error">Gig not found</p>

  const isOwner = user && user.uid === gig.postedBy

  return (
    <div className="gig-detail-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="gig-detail-content">
        {gig.image && <img src={gig.image} alt={gig.title} className="gig-detail-image" />}

        <div className="gig-detail-info">
          <h1>{gig.title}</h1>
          <p className="gig-category-tag">{gig.category}</p>

          {/* Freelancer Info */}
          <div className="freelancer-card">
            <div className="freelancer-info">
              {gig.freelancerImage && (
                <img src={gig.freelancerImage} alt={gig.freelancerName} className="freelancer-image-large" />
              )}
              <div>
                <h3>{gig.freelancerName}</h3>
                <p className="rating">⭐ {gig.freelancerRating.toFixed(1)} • {gig.freelancerReviews} Reviews</p>
              </div>
            </div>

            {isOwner ? (
              <div className="gig-actions">
                <button className="btn-edit" onClick={handleEditGig}>
                  Edit
                </button>
                <button className="btn-delete" onClick={handleDeleteGig}>
                  Delete
                </button>
              </div>
            ) : (
              <button className="btn-send-proposal" onClick={handleSendProposal}>
                Send Proposal
              </button>
            )}
          </div>

          {/* Budget & Details */}
          <div className="gig-details-grid">
            <div className="detail-box">
              <label>Budget</label>
              <p className="detail-value">${gig.budget.min} - ${gig.budget.max}</p>
            </div>
            <div className="detail-box">
              <label>Delivery Time</label>
              <p className="detail-value">{gig.deliveryTime} days</p>
            </div>
            <div className="detail-box">
              <label>Proposals</label>
              <p className="detail-value">{gig.proposals}</p>
            </div>
            <div className="detail-box">
              <label>Status</label>
              <p className="detail-value">{gig.status}</p>
            </div>
          </div>

          {/* Skills */}
          {gig.skills && gig.skills.length > 0 && (
            <div className="skills-section">
              <h3>Skills Required</h3>
              <div className="skills-list">
                {gig.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="description-section">
            <h3>About This Gig</h3>
            <p>{gig.description}</p>
          </div>

          {/* Stats */}
          <div className="gig-stats">
            <p>📊 {gig.views} views • Posted {new Date(gig.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
