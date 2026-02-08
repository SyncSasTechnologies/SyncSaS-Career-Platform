import { useEffect, useState } from "react"
import { fetchMyInternships } from "../services/internship.service"
import DashboardStats from "../components/DashboardStats"
import ProgressTracker from "../components/ProgressTracker"
import "../styles/dashboard.css"

export default function InternDashboard() {
  const [internships, setInternships] = useState([])
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [filterTier, setFilterTier] = useState("all")

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMyInternships()
        setInternships(data)
        if (data.length > 0) {
          setSelectedInternship(data[0])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredInternships = filterTier === "all" 
    ? internships 
    : internships.filter(i => i.tier === filterTier)

  if (loading) {
    return (
      <div className="dashboard-container loading">
        <div className="spinner"></div>
        <p>Loading your internships...</p>
      </div>
    )
  }

  if (internships.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>No Internships Yet</h2>
          <p>Explore available internships and enroll to get started</p>
          <a href="/internships/browse" className="btn btn-primary">
            Browse Internships
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Internship Dashboard</h1>
          <p>Track your progress, complete tasks, and earn certificates</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{internships.length}</span>
            <span className="stat-label">Active Internships</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{internships.filter(i => i.status === 'completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === "progress" ? "active" : ""}`}
          onClick={() => setActiveTab("progress")}
        >
          📈 Progress
        </button>
        <button 
          className={`tab-btn ${activeTab === "tasks" ? "active" : ""}`}
          onClick={() => setActiveTab("tasks")}
        >
          ✓ Tasks
        </button>
        <button 
          className={`tab-btn ${activeTab === "feedback" ? "active" : ""}`}
          onClick={() => setActiveTab("feedback")}
        >
          💬 Feedback
        </button>
      </div>

      <div className="dashboard-content">
        {/* Sidebar - Internship List */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h3>Your Internships</h3>
            <select 
              value={filterTier} 
              onChange={(e) => setFilterTier(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tiers</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>

          <div className="internship-list">
            {filteredInternships.map((internship) => (
              <div
                key={internship._id}
                className={`internship-item ${selectedInternship?._id === internship._id ? "active" : ""}`}
                onClick={() => setSelectedInternship(internship)}
              >
                <div className="internship-item-header">
                  <h4>{internship.title || internship.internshipId}</h4>
                  <span className={`tier-badge tier-${internship.tier?.toLowerCase()}`}>
                    {internship.tier}
                  </span>
                </div>
                <p className="internship-status">{internship.status}</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${internship.progress || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-main">
          {selectedInternship && (
            <>
              {/* Selected Internship Header */}
              <div className="internship-header">
                <div className="header-left">
                  <h2>{selectedInternship.title || selectedInternship.internshipId}</h2>
                  <div className="header-meta">
                    <span className={`status-badge status-${selectedInternship.status}`}>
                      {selectedInternship.status?.toUpperCase()}
                    </span>
                    <span className={`tier-badge tier-${selectedInternship.tier?.toLowerCase()}`}>
                      {selectedInternship.tier}
                    </span>
                  </div>
                </div>
                <div className="header-right">
                  <button className="btn btn-secondary">View Details</button>
                  <button className="btn btn-primary">Continue Learning</button>
                </div>
              </div>

              {/* Dynamic Content Based on Active Tab */}
              {activeTab === "overview" && (
                <div className="tab-content">
                  <DashboardStats internship={selectedInternship} />
                  <div className="content-grid">
                    <div className="card">
                      <h3>📋 Current Level</h3>
                      <div className="level-indicator">
                        <div className="level-badge">Level {selectedInternship.currentLevel || 1}</div>
                        <p className="level-info">of 3 levels</p>
                      </div>
                      <div className="level-progress">
                        <p>Tasks Completed: {selectedInternship.tasksCompleted || 0}/5</p>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${((selectedInternship.tasksCompleted || 0) / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <h3>🎓 Certificate Status</h3>
                      <div className="certificate-status">
                        <div className={`cert-indicator ${selectedInternship.status === 'completed' ? 'earned' : 'pending'}`}>
                          {selectedInternship.status === 'completed' ? '✓ Earned' : '⏳ In Progress'}
                        </div>
                        <p className="cert-info">Complete all tasks and levels to earn your certificate</p>
                      </div>
                    </div>

                    <div className="card">
                      <h3>📊 Performance Score</h3>
                      <div className="performance-score">
                        <div className="score-circle">
                          <span className="score-number">{selectedInternship.performanceScore || 0}%</span>
                        </div>
                        <p className="score-label">Based on task submissions & mentor feedback</p>
                      </div>
                    </div>

                    <div className="card">
                      <h3>🏆 Skills Earned</h3>
                      <div className="skills-list">
                        {selectedInternship.skillsEarned && selectedInternship.skillsEarned.length > 0 ? (
                          selectedInternship.skillsEarned.map((skill, idx) => (
                            <span key={idx} className="skill-tag">{skill}</span>
                          ))
                        ) : (
                          <p>Complete tasks to earn skills</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "progress" && (
                <div className="tab-content">
                  <ProgressTracker internship={selectedInternship} />
                </div>
              )}

              {activeTab === "tasks" && (
                <div className="tab-content">
                  <div className="card">
                    <h3>📝 Current Tasks</h3>
                    <div className="tasks-container">
                      {selectedInternship.tasks && selectedInternship.tasks.length > 0 ? (
                        selectedInternship.tasks.map((task, idx) => (
                          <div key={idx} className="task-item">
                            <div className="task-header">
                              <h4>{task.title || `Task ${idx + 1}`}</h4>
                              <span className={`task-status ${task.status?.toLowerCase()}`}>
                                {task.status || 'pending'}
                              </span>
                            </div>
                            <p className="task-description">{task.description || 'Complete this task to progress'}</p>
                            <p className="task-deadline">Due: {task.dueDate || 'No deadline'}</p>
                            {task.status !== 'completed' && (
                              <button className="btn btn-small btn-primary">Start Task</button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="empty-message">No tasks available yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "feedback" && (
                <div className="tab-content">
                  <div className="card">
                    <h3>💬 Mentor Feedback</h3>
                    <div className="feedback-container">
                      {selectedInternship.mentorFeedback && selectedInternship.mentorFeedback.length > 0 ? (
                        selectedInternship.mentorFeedback.map((feedback, idx) => (
                          <div key={idx} className="feedback-item">
                            <div className="feedback-header">
                              <span className="feedback-mentor">{feedback.mentorName || 'Mentor'}</span>
                              <span className="feedback-date">{feedback.date || 'Recent'}</span>
                            </div>
                            <p className="feedback-text">{feedback.comment}</p>
                            <span className={`feedback-rating ${feedback.rating}`}>
                              Rating: {feedback.rating}/5
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="empty-message">No feedback yet. Keep working on tasks!</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
