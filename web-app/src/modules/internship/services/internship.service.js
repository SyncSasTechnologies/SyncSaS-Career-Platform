import axios from "axios"
import { auth } from "../../../auth/firebase"

const API_URL = "http://localhost:5000/api/internships"

// Mock data for development
const MOCK_INTERNSHIPS = [
  {
    _id: "1",
    internshipId: "INTERN-001",
    title: "Full Stack Web Development",
    tier: "Premium",
    status: "in-progress",
    currentLevel: 1,
    progress: 40,
    overallProgress: 20,
    tasksCompleted: 2,
    performanceScore: 85,
    daysRemaining: 45,
    skillsEarned: ["React", "Node.js", "MongoDB"],
    tasks: [
      { id: 1, title: "Build React Components", description: "Create reusable React components", status: "completed", dueDate: "2024-01-25" },
      { id: 2, title: "API Integration", description: "Connect frontend to backend API", status: "in-progress", dueDate: "2024-01-28" },
      { id: 3, title: "Database Design", description: "Design MongoDB schemas", status: "pending", dueDate: "2024-02-01" },
      { id: 4, title: "Authentication", description: "Implement user authentication", status: "pending", dueDate: "2024-02-05" },
      { id: 5, title: "Testing", description: "Write unit and integration tests", status: "pending", dueDate: "2024-02-10" }
    ],
    mentorFeedback: [
      { mentorName: "John Doe", date: "2024-01-20", comment: "Great progress on React components! Keep up the good work.", rating: 4 },
      { mentorName: "Jane Smith", date: "2024-01-15", comment: "Your API integration logic is solid. Consider error handling.", rating: 3 }
    ],
    levelTasks: {
      level1: [
        { id: 1, name: "Introduction to the Module", status: "completed" },
        { id: 2, name: "Setup Your Environment", status: "completed" },
        { id: 3, name: "Complete First Task", status: "in-progress" },
        { id: 4, name: "Submit First Project", status: "pending" },
        { id: 5, name: "Pass Level 1 Assessment", status: "pending" }
      ],
      level2: [
        { id: 1, name: "Advanced Concepts", status: "pending" },
        { id: 2, name: "Build Project 1", status: "pending" },
        { id: 3, name: "Code Review & Feedback", status: "pending" },
        { id: 4, name: "Collaborate on Team Project", status: "pending" },
        { id: 5, name: "Pass Level 2 Assessment", status: "pending" }
      ],
      level3: [
        { id: 1, name: "Advanced Problem Solving", status: "pending" },
        { id: 2, name: "Lead a Team Project", status: "pending" },
        { id: 3, name: "Create Documentation", status: "pending" },
        { id: 4, name: "Mentor Junior Interns", status: "pending" },
        { id: 5, name: "Final Capstone Project", status: "pending" }
      ]
    }
  },
  {
    _id: "2",
    internshipId: "INTERN-002",
    title: "Data Science Fundamentals",
    tier: "Basic",
    status: "active",
    currentLevel: 1,
    progress: 20,
    overallProgress: 10,
    tasksCompleted: 1,
    performanceScore: 78,
    daysRemaining: 60,
    skillsEarned: ["Python", "Pandas"],
    tasks: [
      { id: 1, title: "Python Basics", description: "Learn Python fundamentals", status: "completed", dueDate: "2024-01-20" },
      { id: 2, title: "Data Manipulation", description: "Work with Pandas", status: "in-progress", dueDate: "2024-02-01" },
      { id: 3, title: "Data Visualization", description: "Create plots with Matplotlib", status: "pending", dueDate: "2024-02-15" }
    ],
    mentorFeedback: [
      { mentorName: "Alice Johnson", date: "2024-01-18", comment: "Good understanding of Python basics. Ready to move forward.", rating: 4 }
    ],
    levelTasks: {
      level1: [
        { id: 1, name: "Introduction to the Module", status: "completed" },
        { id: 2, name: "Setup Your Environment", status: "completed" },
        { id: 3, name: "Complete First Task", status: "in-progress" },
        { id: 4, name: "Submit First Project", status: "pending" },
        { id: 5, name: "Pass Level 1 Assessment", status: "pending" }
      ],
      level2: Array(5).fill(null).map((_, i) => ({ id: i + 1, name: `Advanced Task ${i + 1}`, status: "pending" })),
      level3: Array(5).fill(null).map((_, i) => ({ id: i + 1, name: `Expert Task ${i + 1}`, status: "pending" }))
    }
  },
  {
    _id: "3",
    internshipId: "INTERN-003",
    title: "Corporate Software Engineering",
    tier: "Corporate",
    status: "completed",
    currentLevel: 3,
    progress: 100,
    overallProgress: 100,
    tasksCompleted: 5,
    performanceScore: 95,
    daysRemaining: 0,
    skillsEarned: ["Java", "Spring Boot", "Microservices", "Docker"],
    tasks: [
      { id: 1, title: "Enterprise Application Design", description: "Design scalable systems", status: "completed", dueDate: "2023-12-01" },
      { id: 2, title: "Microservices Implementation", description: "Build microservices architecture", status: "completed", dueDate: "2023-12-15" },
      { id: 3, title: "DevOps & Deployment", description: "Deploy with Docker & Kubernetes", status: "completed", dueDate: "2023-12-30" }
    ],
    mentorFeedback: [
      { mentorName: "Robert Brown", date: "2024-01-10", comment: "Excellent work! You've completed all requirements. Certificate ready.", rating: 5 }
    ],
    levelTasks: {
      level1: Array(5).fill(null).map((_, i) => ({ id: i + 1, name: `Task ${i + 1}`, status: "completed" })),
      level2: Array(5).fill(null).map((_, i) => ({ id: i + 1, name: `Task ${i + 1}`, status: "completed" })),
      level3: Array(5).fill(null).map((_, i) => ({ id: i + 1, name: `Task ${i + 1}`, status: "completed" }))
    }
  }
]

export const fetchMyInternships = async () => {
  try {
    const token = await auth.currentUser?.getIdToken()

    // Try to fetch from API first
    const res = await axios.get(`${API_URL}/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (err) {
    console.warn("Using mock data for development:", err.message)
    // Return mock data if API fails (for development)
    return MOCK_INTERNSHIPS
  }
}
