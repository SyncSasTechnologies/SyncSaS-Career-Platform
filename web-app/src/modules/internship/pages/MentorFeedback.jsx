import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/mentor-feedback.css';

const MentorFeedback = () => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [filter, setFilter] = useState('all'); // all, tasks, general

  useEffect(() => {
    // Mock feedback data - replace with actual API call
    const mockFeedback = [
      {
        id: 1,
        type: 'task',
        taskTitle: 'Build RESTful API',
        mentorName: 'Sarah Johnson',
        mentorAvatar: '👩‍💼',
        date: '2026-01-28',
        rating: 4.5,
        comment: 'Great job on implementing the API! Your code structure is clean and follows best practices. However, I noticed you could improve error handling in some edge cases. Consider adding more comprehensive validation for user inputs.',
        strengths: [
          'Clean code structure',
          'Good use of middleware',
          'Well-documented endpoints'
        ],
        improvements: [
          'Add more error handling',
          'Improve input validation',
          'Consider adding rate limiting'
        ],
        attachments: [
          { name: 'code_review.pdf', size: '245 KB', icon: '📄' }
        ]
      },
      {
        id: 2,
        type: 'general',
        mentorName: 'Sarah Johnson',
        mentorAvatar: '👩‍💼',
        date: '2026-01-25',
        subject: 'Weekly Progress Review',
        comment: 'You\'re making excellent progress! Your dedication and attention to detail are commendable. Keep up the great work with your tasks, and don\'t hesitate to reach out if you need any guidance.',
        rating: 5,
        highlights: [
          'Consistent task completion',
          'Active participation in discussions',
          'Quick to implement feedback'
        ]
      },
      {
        id: 3,
        type: 'task',
        taskTitle: 'Database Schema Design',
        mentorName: 'Sarah Johnson',
        mentorAvatar: '👩‍💼',
        date: '2026-01-22',
        rating: 4,
        comment: 'Your database schema is well thought out. Good normalization and relationship definitions. One suggestion: consider adding indexes on frequently queried columns to improve performance.',
        strengths: [
          'Proper normalization',
          'Clear relationships',
          'Good naming conventions'
        ],
        improvements: [
          'Add database indexes',
          'Consider cascading deletes',
          'Add migration scripts'
        ]
      },
      {
        id: 4,
        type: 'task',
        taskTitle: 'Frontend Component Development',
        mentorName: 'Sarah Johnson',
        mentorAvatar: '👩‍💼',
        date: '2026-01-18',
        rating: 5,
        comment: 'Excellent work! Your components are reusable, well-structured, and follow React best practices. The UI is intuitive and responsive. This is exactly the quality we\'re looking for!',
        strengths: [
          'Reusable components',
          'Responsive design',
          'Clean code',
          'Good state management'
        ],
        improvements: []
      },
      {
        id: 5,
        type: 'general',
        mentorName: 'Sarah Johnson',
        mentorAvatar: '👩‍💼',
        date: '2026-01-15',
        subject: 'Mid-Internship Check-in',
        comment: 'I wanted to commend you on your progress so far. You\'ve shown great initiative and problem-solving skills. As we move into the more advanced topics, remember to take your time and don\'t hesitate to ask questions.',
        rating: 4.5,
        highlights: [
          'Strong problem-solving skills',
          'Good communication',
          'Willingness to learn'
        ]
      }
    ];

    setFeedback(mockFeedback);
    setLoading(false);
  }, []);

  const filteredFeedback = filter === 'all' 
    ? feedback 
    : feedback.filter(item => item.type === filter);

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return <div className="rating-stars">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="mentor-feedback-page">
        <div className="loading">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="mentor-feedback-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Mentor Feedback</h1>
            <p>Review comments and suggestions from your mentor</p>
          </div>
          <Link to="/intern/mentor" className="btn btn-primary">
            Contact Mentor
          </Link>
        </div>

        {/* Mentor Info Card */}
        <div className="mentor-info-card">
          <div className="mentor-avatar">👩‍💼</div>
          <div className="mentor-details">
            <h3>Sarah Johnson</h3>
            <p className="mentor-title">Senior Full Stack Developer</p>
            <p className="mentor-bio">
              10+ years of experience in web development. Specialized in React, Node.js, and cloud architecture.
            </p>
          </div>
          <div className="mentor-stats">
            <div className="stat">
              <span className="stat-value">4.8</span>
              <span className="stat-label">Avg Rating</span>
            </div>
            <div className="stat">
              <span className="stat-value">{feedback.length}</span>
              <span className="stat-label">Feedback</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Feedback ({feedback.length})
          </button>
          <button
            className={`tab ${filter === 'task' ? 'active' : ''}`}
            onClick={() => setFilter('task')}
          >
            Task Reviews ({feedback.filter(f => f.type === 'task').length})
          </button>
          <button
            className={`tab ${filter === 'general' ? 'active' : ''}`}
            onClick={() => setFilter('general')}
          >
            General Feedback ({feedback.filter(f => f.type === 'general').length})
          </button>
        </div>

        {/* Feedback List */}
        {filteredFeedback.length > 0 ? (
          <div className="feedback-list">
            {filteredFeedback.map(item => (
              <div key={item.id} className={`feedback-card ${item.type}`}>
                <div className="feedback-header">
                  <div className="feedback-title">
                    {item.type === 'task' ? (
                      <>
                        <span className="type-badge task">Task Review</span>
                        <h3>{item.taskTitle}</h3>
                      </>
                    ) : (
                      <>
                        <span className="type-badge general">General</span>
                        <h3>{item.subject}</h3>
                      </>
                    )}
                  </div>
                  <div className="feedback-meta">
                    <span className="date">{new Date(item.date).toLocaleDateString()}</span>
                    {renderRating(item.rating)}
                  </div>
                </div>

                <div className="feedback-body">
                  <div className="mentor-info">
                    <span className="mentor-avatar-small">{item.mentorAvatar}</span>
                    <span className="mentor-name">{item.mentorName}</span>
                  </div>

                  <div className="feedback-comment">
                    <p>{item.comment}</p>
                  </div>

                  {item.strengths && item.strengths.length > 0 && (
                    <div className="feedback-section strengths">
                      <h4>✓ Strengths</h4>
                      <ul>
                        {item.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.improvements && item.improvements.length > 0 && (
                    <div className="feedback-section improvements">
                      <h4>💡 Areas for Improvement</h4>
                      <ul>
                        {item.improvements.map((improvement, index) => (
                          <li key={index}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="feedback-section highlights">
                      <h4>🌟 Highlights</h4>
                      <ul>
                        {item.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.attachments && item.attachments.length > 0 && (
                    <div className="feedback-attachments">
                      <h4>📎 Attachments</h4>
                      <div className="attachments-list">
                        {item.attachments.map((attachment, index) => (
                          <a key={index} href="#" className="attachment-item">
                            <span className="attachment-icon">{attachment.icon}</span>
                            <span className="attachment-name">{attachment.name}</span>
                            <span className="attachment-size">({attachment.size})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {item.type === 'task' && (
                  <div className="feedback-actions">
                    <Link to={`/intern/tasks/${item.id}`} className="btn btn-secondary">
                      View Task
                    </Link>
                    <button className="btn btn-outline">Mark as Read</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>No feedback yet</h3>
            <p>Your mentor will provide feedback as you complete tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorFeedback;
