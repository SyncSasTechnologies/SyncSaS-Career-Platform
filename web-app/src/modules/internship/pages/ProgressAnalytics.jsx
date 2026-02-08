import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/progress-analytics.css';

const ProgressAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('all'); // all, month, week

  useEffect(() => {
    // Mock analytics data - replace with actual API call
    const mockAnalytics = {
      overview: {
        completionRate: 68,
        tasksCompleted: 12,
        totalTasks: 18,
        currentLevel: 'Intermediate',
        daysActive: 23,
        totalPoints: 850,
        ranking: 15,
        totalParticipants: 120
      },
      skillProgress: [
        { skill: 'Frontend Development', progress: 85, level: 'Advanced' },
        { skill: 'Backend Development', progress: 70, level: 'Intermediate' },
        { skill: 'Database Design', progress: 60, level: 'Intermediate' },
        { skill: 'API Development', progress: 75, level: 'Advanced' },
        { skill: 'Testing & QA', progress: 45, level: 'Beginner' },
        { skill: 'DevOps', progress: 40, level: 'Beginner' }
      ],
      weeklyActivity: [
        { week: 'Week 1', tasks: 2, hours: 8, points: 100 },
        { week: 'Week 2', tasks: 3, hours: 12, points: 150 },
        { week: 'Week 3', tasks: 2, hours: 10, points: 120 },
        { week: 'Week 4', tasks: 5, hours: 18, points: 280 }
      ],
      taskBreakdown: {
        completed: 12,
        inProgress: 4,
        notStarted: 2
      },
      performanceMetrics: {
        averageScore: 87,
        submissionRate: 92,
        onTimeSubmission: 83,
        codeQuality: 85
      },
      recentAchievements: [
        { title: 'Fast Learner', icon: '⚡', date: '2026-01-28', description: 'Completed 3 tasks in one week' },
        { title: 'Code Master', icon: '💻', date: '2026-01-25', description: 'Scored 95+ on code quality' },
        { title: 'Team Player', icon: '🤝', date: '2026-01-20', description: 'Helped 5 peers in discussions' }
      ],
      upcomingMilestones: [
        { title: 'Mid-term Evaluation', date: '2026-02-10', daysLeft: 12 },
        { title: 'Project Submission', date: '2026-02-15', daysLeft: 17 },
        { title: 'Level 3 Unlock', tasksRemaining: 3 }
      ]
    };

    setAnalytics(mockAnalytics);
    setLoading(false);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="progress-analytics-page">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  const { overview, skillProgress, weeklyActivity, taskBreakdown, performanceMetrics, recentAchievements, upcomingMilestones } = analytics;

  return (
    <div className="progress-analytics-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Progress Analytics</h1>
            <p>Track your performance and growth throughout your internship</p>
          </div>
          <div className="header-actions">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="time-range-select">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
            <button className="btn btn-secondary">Export Report</button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="overview-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Completion Rate</h3>
              <div className="stat-value">{overview.completionRate}%</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${overview.completionRate}%` }}></div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>Tasks Completed</h3>
              <div className="stat-value">{overview.tasksCompleted}/{overview.totalTasks}</div>
              <p className="stat-label">Total tasks</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>Total Points</h3>
              <div className="stat-value">{overview.totalPoints}</div>
              <p className="stat-label">Points earned</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Ranking</h3>
              <div className="stat-value">#{overview.ranking}</div>
              <p className="stat-label">Out of {overview.totalParticipants} participants</p>
            </div>
          </div>
        </div>

        <div className="analytics-grid">
          {/* Skills Progress */}
          <div className="analytics-card skills-card">
            <h2>Skills Progress</h2>
            <div className="skills-list">
              {skillProgress.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.skill}</span>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                  <div className="skill-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-percent">{skill.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="analytics-card activity-card">
            <h2>Weekly Activity</h2>
            <div className="activity-chart">
              {weeklyActivity.map((week, index) => (
                <div key={index} className="activity-bar-container">
                  <div className="activity-bar-wrapper">
                    <div
                      className="activity-bar"
                      style={{ height: `${(week.tasks / 5) * 100}%` }}
                      title={`${week.tasks} tasks`}
                    >
                      <span className="bar-value">{week.tasks}</span>
                    </div>
                  </div>
                  <div className="activity-label">{week.week}</div>
                  <div className="activity-details">
                    <div>{week.hours}h</div>
                    <div>{week.points}pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Breakdown */}
          <div className="analytics-card breakdown-card">
            <h2>Task Status Breakdown</h2>
            <div className="breakdown-chart">
              <div className="donut-chart">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="20"
                    strokeDasharray={`${(taskBreakdown.completed / overview.totalTasks) * 251.2} 251.2`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="donut-center">
                  <div className="donut-value">{overview.completionRate}%</div>
                </div>
              </div>
              <div className="breakdown-legend">
                <div className="legend-item">
                  <span className="legend-dot completed"></span>
                  <span>Completed: {taskBreakdown.completed}</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot in-progress"></span>
                  <span>In Progress: {taskBreakdown.inProgress}</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot not-started"></span>
                  <span>Not Started: {taskBreakdown.notStarted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="analytics-card metrics-card">
            <h2>Performance Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-label">Average Score</div>
                <div className="metric-value">{performanceMetrics.averageScore}%</div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{ width: `${performanceMetrics.averageScore}%` }}
                  ></div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Submission Rate</div>
                <div className="metric-value">{performanceMetrics.submissionRate}%</div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{ width: `${performanceMetrics.submissionRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">On-Time Submissions</div>
                <div className="metric-value">{performanceMetrics.onTimeSubmission}%</div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{ width: `${performanceMetrics.onTimeSubmission}%` }}
                  ></div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Code Quality</div>
                <div className="metric-value">{performanceMetrics.codeQuality}%</div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{ width: `${performanceMetrics.codeQuality}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-grid">
          {/* Recent Achievements */}
          <div className="analytics-card achievements-card">
            <h2>Recent Achievements</h2>
            <div className="achievements-list">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    <span className="achievement-date">{achievement.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/intern/achievements" className="view-all-link">
              View All Achievements →
            </Link>
          </div>

          {/* Upcoming Milestones */}
          <div className="analytics-card milestones-card">
            <h2>Upcoming Milestones</h2>
            <div className="milestones-list">
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="milestone-item">
                  <div className="milestone-content">
                    <h4>{milestone.title}</h4>
                    {milestone.date && (
                      <p className="milestone-date">
                        Due: {milestone.date}
                        <span className="days-left">{milestone.daysLeft} days left</span>
                      </p>
                    )}
                    {milestone.tasksRemaining && (
                      <p className="tasks-remaining">{milestone.tasksRemaining} tasks remaining</p>
                    )}
                  </div>
                  <div className="milestone-icon">🎯</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
