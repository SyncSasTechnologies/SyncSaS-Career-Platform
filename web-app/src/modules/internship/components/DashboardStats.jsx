import React from 'react'

export default function DashboardStats({ internship }) {
  const stats = [
    {
      label: 'Current Level',
      value: internship?.currentLevel || 1,
      icon: '📊',
      color: 'blue'
    },
    {
      label: 'Tasks Completed',
      value: `${internship?.tasksCompleted || 0}/5`,
      icon: '✓',
      color: 'green'
    },
    {
      label: 'Performance Score',
      value: `${internship?.performanceScore || 0}%`,
      icon: '🎯',
      color: 'orange'
    },
    {
      label: 'Days Remaining',
      value: internship?.daysRemaining || 'N/A',
      icon: '⏰',
      color: 'red'
    }
  ]

  return (
    <div className="dashboard-stats-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className={`stats-card stats-${stat.color}`}>
          <div className="stats-icon">{stat.icon}</div>
          <div className="stats-content">
            <p className="stats-label">{stat.label}</p>
            <p className="stats-value">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
