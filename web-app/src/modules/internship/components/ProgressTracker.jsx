import React, { useState } from 'react'
import '../styles/progress-tracker.css'

export default function ProgressTracker({ internship }) {
  const [expandedLevel, setExpandedLevel] = useState(1)

  const levels = [
    {
      level: 1,
      title: 'Foundation',
      description: 'Learn the basics and fundamentals',
      tasks: internship?.levelTasks?.level1 || [
        { id: 1, name: 'Introduction to the Module', status: 'completed' },
        { id: 2, name: 'Setup Your Environment', status: 'completed' },
        { id: 3, name: 'Complete First Task', status: 'in-progress' },
        { id: 4, name: 'Submit First Project', status: 'pending' },
        { id: 5, name: 'Pass Level 1 Assessment', status: 'pending' }
      ],
      progress: 60
    },
    {
      level: 2,
      title: 'Intermediate',
      description: 'Build real-world projects',
      tasks: internship?.levelTasks?.level2 || [
        { id: 1, name: 'Advanced Concepts', status: 'pending' },
        { id: 2, name: 'Build Project 1', status: 'pending' },
        { id: 3, name: 'Code Review & Feedback', status: 'pending' },
        { id: 4, name: 'Collaborate on Team Project', status: 'pending' },
        { id: 5, name: 'Pass Level 2 Assessment', status: 'pending' }
      ],
      progress: 0
    },
    {
      level: 3,
      title: 'Advanced',
      description: 'Master the subject and mentor others',
      tasks: internship?.levelTasks?.level3 || [
        { id: 1, name: 'Advanced Problem Solving', status: 'pending' },
        { id: 2, name: 'Lead a Team Project', status: 'pending' },
        { id: 3, name: 'Create Documentation', status: 'pending' },
        { id: 4, name: 'Mentor Junior Interns', status: 'pending' },
        { id: 5, name: 'Final Capstone Project', status: 'pending' }
      ],
      progress: 0
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#4CAF50'
      case 'in-progress': return '#FF9800'
      case 'pending': return '#9E9E9E'
      default: return '#999'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return '✓'
      case 'in-progress': return '○'
      case 'pending': return '-'
      default: return '?'
    }
  }

  return (
    <div className="progress-tracker">
      <div className="tracker-overview">
        <h3>Your Journey Through the Internship</h3>
        <div className="overall-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${internship?.overallProgress || 20}%` }}
            ></div>
          </div>
          <p className="progress-text">
            Overall Progress: <strong>{internship?.overallProgress || 20}%</strong>
          </p>
        </div>
      </div>

      <div className="levels-container">
        {levels.map((level) => (
          <div key={level.level} className={`level-card ${expandedLevel === level.level ? 'expanded' : ''}`}>
            <div 
              className="level-header"
              onClick={() => setExpandedLevel(expandedLevel === level.level ? null : level.level)}
            >
              <div className="level-header-left">
                <div className={`level-number level-${level.level}`}>
                  {level.level}
                </div>
                <div className="level-info">
                  <h4>{level.title}</h4>
                  <p>{level.description}</p>
                </div>
              </div>
              <div className="level-header-right">
                <div className="level-progress-mini">
                  <div 
                    className="progress-bar-mini"
                    style={{ 
                      width: `${level.progress}%`,
                      backgroundColor: level.level === 1 ? '#4CAF50' : level.level === 2 ? '#FF9800' : '#2196F3'
                    }}
                  ></div>
                </div>
                <span className="level-progress-text">{level.progress}%</span>
                <span className="expand-icon">{expandedLevel === level.level ? '▼' : '▶'}</span>
              </div>
            </div>

            {expandedLevel === level.level && (
              <div className="level-tasks">
                <div className="tasks-header">
                  <h5>Tasks ({level.tasks.filter(t => t.status === 'completed').length}/{level.tasks.length})</h5>
                </div>
                <div className="tasks-list">
                  {level.tasks.map((task) => (
                    <div key={task.id} className="task-row">
                      <div 
                        className="task-status-icon"
                        style={{ color: getStatusColor(task.status) }}
                        title={task.status}
                      >
                        {getStatusIcon(task.status)}
                      </div>
                      <span className="task-name">{task.name}</span>
                      <span className={`task-status-label status-${task.status}`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
                {level.progress === 100 && (
                  <div className="level-completed-badge">
                    <span>✓ Level Completed!</span>
                  </div>
                )}
                {level.progress < 100 && level.progress > 0 && (
                  <button className="btn btn-primary btn-small">Continue Learning</button>
                )}
                {level.progress === 0 && level.level > 1 && (
                  <button className="btn btn-secondary btn-small" disabled>
                    Complete Previous Level First
                  </button>
                )}
                {level.level === 1 && level.progress === 0 && (
                  <button className="btn btn-primary btn-small">Start Level 1</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="progress-summary">
        <h4>Summary</h4>
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="summary-label">Total Tasks:</span>
            <span className="summary-value">15</span>
          </div>
          <div className="summary-stat">
            <span className="summary-label">Completed:</span>
            <span className="summary-value">{levels.reduce((sum, l) => sum + l.tasks.filter(t => t.status === 'completed').length, 0)}</span>
          </div>
          <div className="summary-stat">
            <span className="summary-label">In Progress:</span>
            <span className="summary-value">{levels.reduce((sum, l) => sum + l.tasks.filter(t => t.status === 'in-progress').length, 0)}</span>
          </div>
          <div className="summary-stat">
            <span className="summary-label">Levels Completed:</span>
            <span className="summary-value">{levels.filter(l => l.progress === 100).length}/3</span>
          </div>
        </div>
      </div>
    </div>
  )
}
