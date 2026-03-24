import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { gigService } from "./services/gig.service"
import "./styles/CreateGig.css"

export default function CreateGig() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: { min: 0, max: 0 },
    skills: [],
    deliveryTime: 5,
    image: "",
  })
  const [skillInput, setSkillInput] = useState("")

  const categories = [
    "Web Development",
    "Mobile Development",
    "Design",
    "Writing",
    "Marketing",
    "Data Analysis",
    "Other",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "minBudget" || name === "maxBudget") {
      setFormData((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          [name === "minBudget" ? "min" : "max"]: parseInt(value) || 0,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.title || !formData.description || !formData.category) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      await gigService.createGig(formData)
      navigate("/freelance/my-gigs")
    } catch (err) {
      setError(err.message || "Failed to create gig")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-gig-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="create-gig-form">
        <h1>Create a New Gig</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Gig Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Build a responsive website"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Min Budget ($) *</label>
              <input
                type="number"
                name="minBudget"
                value={formData.budget.min}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Max Budget ($) *</label>
              <input
                type="number"
                name="maxBudget"
                value={formData.budget.max}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Time (days) *</label>
            <input
              type="number"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              placeholder="Describe your gig in detail..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Skills Required</label>
            <div className="skill-input-group">
              <input
                type="text"
                placeholder="Enter a skill and press Add"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <button type="button" onClick={addSkill}>
                Add Skill
              </button>
            </div>
            <div className="skills-list">
              {formData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button type="button" onClick={() => removeSkill(index)}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Creating..." : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  )
}
