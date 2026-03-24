import { useEffect, useState } from "react"
import { fetchMyInternships } from "../services/internship.service"

import DashboardStats from "../components/DashboardStats"
import ProgressTracker from "../components/ProgressTracker"
import "../styles/dashboard.css"

import StatsCard from "../../../components/dashboard/StatsCard"
import ProgressBar from "../../../components/dashboard/ProgressBar"


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

  
  if (loading) return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "16px",
    }}>
      <div style={{
        width: "48px",
        height: "48px",
        border: "4px solid var(--border)",
        borderTop: "4px solid var(--primary)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
        Loading your dashboard...
      </p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  
  if (internships.length === 0) return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "16px",
      textAlign: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "24px",
        background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "36px",
        marginBottom: "8px",
      }}>
        🎓
      </div>
      <h2 style={{ color: "var(--text)", fontWeight: 800 }}>
        No Internships Yet!
      </h2>
      <p style={{ color: "var(--text-muted)", fontSize: "15px", maxWidth: "320px" }}>
        You haven't enrolled in any internships yet. Browse and apply to get started!
      </p>
      <a href="/internships" style={{
        marginTop: "8px",
        padding: "11px 28px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
        color: "white",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "15px",
        boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
      }}>
        Browse Internships →
      </a>
    </div>
  )

  return (
    <div style={{
      padding: "32px",
      background: "var(--bg)",
      minHeight: "100vh",
    }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div>
          <h1 style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "4px",
          }}>
            My Dashboard 👋
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            You are enrolled in {internships.length} internship
            {internships.length > 1 ? "s" : ""}
          </p>
        </div>

        <a href="/internships" style={{
          padding: "10px 22px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          color: "white",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "14px",
          boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
        }}>
          + Browse More
        </a>
      </div>

      {/* Stats Row — uses REAL data */}
      <div style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "28px",
      }}>
        <StatsCard
          icon="🎓"
          label="Enrolled Internships"
          value={internships.length}
          color="#6366F1"
        />
        <StatsCard
          icon="✅"
          label="Completed"
          value={internships.filter(i => i.status === "completed").length}
          color="#10B981"
        />
        <StatsCard
          icon="⏳"
          label="In Progress"
          value={internships.filter(i => i.status === "active" || i.status === "enrolled").length}
          color="#F59E0B"
        />
        <StatsCard
          icon="📜"
          label="Certificates"
          value={internships.filter(i => i.certificate).length}
          color="#EC4899"
        />
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "4px",
        marginBottom: "24px",
        background: "var(--surface)",
        padding: "4px",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        width: "fit-content",
      }}>
        {["overview", "tasks", "certificates"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === tab
                ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                : "transparent",
              color: activeTab === tab ? "white" : "var(--text-muted)",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              textTransform: "capitalize",
              fontFamily: "inherit",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===== OVERVIEW TAB ===== */}
      {activeTab === "overview" && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>

          
          {internships.map((item) => (
            <div key={item._id} style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}>

              {/* Internship Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "10px",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #6366F115, #8B5CF615)",
                    border: "1px solid #6366F130",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    flexShrink: 0,
                  }}>
                    🎓
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "3px",
                    }}>
                      {item.internshipId}
                    </h3>
                    <p style={{
                      fontSize: "13px",
                      color: "var(--text-muted)",
                    }}>
                      SyncSaS Technologies
                    </p>
                  </div>
                </div>

                
                <span style={{
                  padding: "5px 14px",
                  borderRadius: "99px",
                  fontSize: "12px",
                  fontWeight: 700,
                  background: item.status === "completed"
                    ? "#F0FDF4"
                    : item.status === "active"
                    ? "#EEF2FF"
                    : "#FFF7ED",
                  color: item.status === "completed"
                    ? "#16A34A"
                    : item.status === "active"
                    ? "#6366F1"
                    : "#D97706",
                  textTransform: "capitalize",
                }}>
                  {item.status}
                </span>
              </div>

              
              <div style={{ marginBottom: "20px" }}>
                <ProgressBar
                  label="Overall Progress"
                  value={0}
                  color="#6366F1"
                />
              </div>

              
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
              }}>

                {/* Tasks */}
                <div style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "16px",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}>
                    <span style={{ fontSize: "18px" }}>📋</span>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}>
                      Tasks
                    </span>
                  </div>
                  
                  <p style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}>
                    Task system connected
                  </p>
                </div>

                {/* Mentor Feedback */}
                <div style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "16px",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}>
                    <span style={{ fontSize: "18px" }}>👨‍🏫</span>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}>
                      Mentor Feedback
                    </span>
                  </div>
                  
                  <p style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}>
                    Not reviewed yet.
                  </p>
                </div>

                {/* Certificate */}
                <div style={{
                  background: item.certificate
                    ? "linear-gradient(135deg, #F0FDF4, #DCFCE7)"
                    : "var(--bg)",
                  border: item.certificate
                    ? "1px solid #BBF7D0"
                    : "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "16px",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}>
                    <span style={{ fontSize: "18px" }}>📜</span>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}>
                      Certificate
                    </span>
                  </div>
                  
                  <p style={{
                    fontSize: "13px",
                    color: item.certificate ? "#16A34A" : "var(--text-muted)",
                    lineHeight: 1.5,
                    fontWeight: item.certificate ? 600 : 400,
                  }}>
                    {item.certificate ? "✅ Available!" : "Not available"}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== TASKS TAB ===== */}
      {activeTab === "tasks" && (
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "24px",
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "20px",
          }}>
            📋 Tasks
          </h3>
          {internships.map((item) => (
            <div key={item._id} style={{
              padding: "14px 16px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <span style={{ fontSize: "20px" }}>⏳</span>
              <div>
                <p style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "2px",
                }}>
                  {item.internshipId}
                </p>
                
                <p style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                }}>
                  Task system connected — UI coming next
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== CERTIFICATES TAB ===== */}
      {activeTab === "certificates" && (
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "24px",
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "20px",
          }}>
            📜 Certificates
          </h3>

          
          {internships.filter(i => i.certificate).length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "var(--text-muted)",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏆</div>
              <p style={{ fontSize: "15px", fontWeight: 600 }}>
                No certificates yet
              </p>
              <p style={{ fontSize: "13px", marginTop: "6px" }}>
                Complete your internship to earn one!
              </p>
            </div>
          ) : (
            internships
              .filter(i => i.certificate)
              .map((item) => (
                <div key={item._id} style={{
                  background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
                  border: "1px solid #C7D2FE",
                  borderRadius: "16px",
                  padding: "28px",
                  textAlign: "center",
                  maxWidth: "400px",
                  marginBottom: "16px",
                }}>
                  <img
                    src="/logo.png"
                    alt="SyncSaS"
                    style={{
                      width: "52px",
                      height: "52px",
                      objectFit: "contain",
                      marginBottom: "12px",
                    }}
                  />
                  <p style={{
                    fontSize: "13px",
                    color: "var(--primary)",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    marginBottom: "8px",
                  }}>
                    CERTIFICATE OF COMPLETION
                  </p>
                  <p style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "var(--text)",
                    marginBottom: "4px",
                  }}>
                    {item.internshipId}
                  </p>
                  <p style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    marginBottom: "20px",
                  }}>
                    Issued by SyncSaS Technologies · 2025
                  </p>
                  <button style={{
                    padding: "10px 24px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}>
                    Download Certificate
                  </button>
                </div>
              ))
          )}
        </div>
      )}

    </div>
  )
}