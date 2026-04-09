import { useMemo, useState } from "react"
import "../styles/public-pages.css"

const MOCK_TASKS = [
  {
    id: "t1",
    title: "Build a responsive landing page",
    status: "in-progress",
    dueDate: "2026-02-05",
    points: 10,
    level: 1,
    description: "Create a mobile-first landing page using React and CSS."
  },
  {
    id: "t2",
    title: "API Integration for internship list",
    status: "pending",
    dueDate: "2026-02-10",
    points: 15,
    level: 1,
    description: "Wire up public internships API and handle loading states."
  },
  {
    id: "t3",
    title: "Mentor feedback improvements",
    status: "completed",
    dueDate: "2026-01-20",
    points: 8,
    level: 1,
    description: "Improve the feedback UI and add rating display."
  },
  {
    id: "t4",
    title: "Certificate preview page",
    status: "pending",
    dueDate: "2026-02-15",
    points: 12,
    level: 2,
    description: "Create a certificate preview and download placeholder."
  }
]

export default function InternshipTasks() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [query, setQuery] = useState("")

  const tasks = useMemo(() => {
    return MOCK_TASKS.filter((task) => {
      const matchesStatus = statusFilter === "all" || task.status === statusFilter
      const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [statusFilter, query])

  return (
    <div className="internship-page">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Your Tasks</h1>
            <p className="page-subtitle">Track assignments, deadlines, and progress.</p>
          </div>
          <div className="toolbar">
            <input
              className="search-input"
              placeholder="Search tasks"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="select-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="task-list">
          {tasks.length === 0 && (
            <div className="card">
              <p className="card-text">No tasks found for this filter.</p>
            </div>
          )}

          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <h3 className="card-title">{task.title}</h3>
              <p className="card-text">{task.description}</p>
              <div className="task-meta">
                <span className={`badge status`}>Status: {task.status}</span>
                <span>Level {task.level}</span>
                <span>Points: {task.points}</span>
                <span>Due: {task.dueDate}</span>
              </div>
              <div className="actions">
                <button className="btn primary">Open Task</button>
                <button className="btn secondary">Submit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
