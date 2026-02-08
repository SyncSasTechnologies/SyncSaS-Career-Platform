# Internship Dashboard - Architecture & Flow Diagram

## 🏗️ Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    InternDashboard                           │
│                   (Main Page Component)                      │
│                                                              │
│  State:                                                      │
│  ├── internships (array)                                    │
│  ├── selectedInternship (object)                            │
│  ├── loading (boolean)                                      │
│  ├── activeTab (string)                                     │
│  └── filterTier (string)                                    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ DashboardHeader                                    │    │
│  │ ├── Title & Subtitle                              │    │
│  │ └── StatCards (2)                                 │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ DashboardTabs (Navigation)                         │    │
│  │ ├── Overview Tab                                  │    │
│  │ ├── Progress Tab                                  │    │
│  │ ├── Tasks Tab                                     │    │
│  │ └── Feedback Tab                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────┬──────────────────────────────┐   │
│  │                      │                              │   │
│  │  DashboardSidebar    │      DashboardMain           │   │
│  │                      │  (Content changes by tab)    │   │
│  │ ├── Sidebar Header   │                              │   │
│  │ │  ├── Title        │  Overview Tab:               │   │
│  │ │  └── Filter       │  ├── DashboardStats ◄─┐     │   │
│  │ │                   │  ├── Level Card       │     │   │
│  │ ├── Internship List │  ├── Certificate Card │     │   │
│  │ │  ├── Item 1       │  ├── Performance Card │     │   │
│  │ │  ├── Item 2       │  └── Skills Card      │     │   │
│  │ │  └── Item 3       │                       │     │   │
│  │ │                   │  Progress Tab:        │     │   │
│  │ └── Click to        │  └── ProgressTracker ◄─┤    │   │
│  │    Select & Filter  │     ├── Level 1 Card │     │   │
│  │                      │     ├── Level 2 Card │     │   │
│  │                      │     ├── Level 3 Card │     │   │
│  │                      │     └── Summary Stats │     │   │
│  │                      │                      │     │   │
│  │                      │  Tasks Tab:          │     │   │
│  │                      │  └── Task List       │     │   │
│  │                      │                      │     │   │
│  │                      │  Feedback Tab:       │     │   │
│  │                      │  └── Feedback Cards  │     │   │
│  │                      └──────────────────────┘    │   │
│  └──────────────────────┴──────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📊 DashboardStats Component

```
┌────────────────────────────────┐
│      DashboardStats            │
│                                │
│  Props: internship (object)    │
│                                │
│  ┌──────────┬──────────┐      │
│  │ Stat 1   │ Stat 2   │      │
│  │ Current  │ Tasks    │      │
│  │ Level    │ Done     │      │
│  └──────────┴──────────┘      │
│                                │
│  ┌──────────┬──────────┐      │
│  │ Stat 3   │ Stat 4   │      │
│  │ Perf     │ Days     │      │
│  │ Score    │ Left     │      │
│  └──────────┴──────────┘      │
│                                │
└────────────────────────────────┘
```

## 🎯 ProgressTracker Component

```
┌──────────────────────────────────────────┐
│         ProgressTracker                  │
│                                          │
│  Props: internship (object)              │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Overall Progress: 20%            │   │
│  │ ████░░░░░░░░░░░░░░░░░░░░░░ 20%  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ ▼ Level 1: Foundation (60%)     │   │
│  │   Expanded View:                 │   │
│  │   ✓ Introduction                 │   │
│  │   ✓ Setup Environment            │   │
│  │   ○ Complete First Task          │   │
│  │   - Submit First Project         │   │
│  │   - Pass Assessment              │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ ▶ Level 2: Intermediate (0%)    │   │
│  │   [Click to expand]              │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ ▶ Level 3: Advanced (0%)        │   │
│  │   [Click to expand]              │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Summary                          │   │
│  │ Total Tasks: 15  Completed: 3   │   │
│  │ In Progress: 1   Levels: 1/3    │   │
│  └──────────────────────────────────┘   │
│                                          │
└──────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

```
User Opens Dashboard
        │
        ▼
   useEffect Hook
        │
        ├─► fetchMyInternships()
        │        │
        │        ├─► Try API: /api/internships/my
        │        │    │
        │        │    ├─ Success ──► return API data
        │        │    │
        │        │    └─ Fail ──► return MOCK_DATA
        │        │
        │        └─► Set State: internships, selectedInternship
        │
        ▼
   Component Re-renders
        │
        ├─► Render DashboardHeader
        ├─► Render DashboardTabs
        ├─► Render Sidebar with Internship List
        └─► Render Main Content (based on activeTab)
        
User Interaction (Click Tab)
        │
        ├─► setActiveTab(newTab)
        │
        ▼
   State Updated
        │
        ▼
   Component Re-renders with new Tab Content
        │
        ├─► Overview Tab ──► render DashboardStats + Cards
        ├─► Progress Tab ──► render ProgressTracker
        ├─► Tasks Tab ──────► render Task List
        └─► Feedback Tab ──► render Feedback Cards

User Interaction (Select Internship)
        │
        ├─► setSelectedInternship(internship)
        │
        ▼
   State Updated
        │
        ▼
   Component Re-renders with New Internship Data
        │
        └─► All Cards Update with New Data
```

## 🎨 CSS Architecture

```
dashboard.css (600+ lines)
├── Container & Layout
│   ├── .dashboard-container
│   ├── .dashboard-header
│   ├── .dashboard-content
│   ├── .dashboard-sidebar
│   └── .dashboard-main
├── Navigation
│   ├── .dashboard-tabs
│   └── .tab-btn / .tab-btn.active
├── Cards & Components
│   ├── .card
│   ├── .stat-card
│   ├── .internship-item
│   └── .tier-badge
├── Status Indicators
│   ├── .status-badge
│   ├── .status-active
│   ├── .status-completed
│   └── .status-pending
├── Interactive Elements
│   ├── .btn / .btn-primary / .btn-secondary
│   ├── .task-item
│   ├── .feedback-item
│   └── .skill-tag
└── Responsive Design
    ├── @media (max-width: 1024px)
    ├── @media (max-width: 768px)
    └── @media (max-width: 480px)

progress-tracker.css (400+ lines)
├── Level Cards
│   ├── .level-card
│   ├── .level-header
│   └── .level-number / .level-1 / .level-2 / .level-3
├── Tasks
│   ├── .task-row
│   ├── .task-status-icon
│   └── .task-status-label
├── Progress
│   ├── .progress-bar
│   ├── .progress-fill
│   └── .level-progress-mini
├── Summary
│   ├── .progress-summary
│   └── .summary-stat
└── Responsive Design
    ├── @media (max-width: 768px)
    └── @media (max-width: 480px)
```

## 📱 Layout Breakpoints

```
Desktop (1024px+)
┌─────────────────────────────────┐
│ Header                          │
├────────┬────────────────────────┤
│        │                        │
│Sidebar │   Main Content         │
│ (300px)│   (1fr)                │
│        │                        │
│        │  ┌────────────────┐   │
│        │  │  Tab Content   │   │
│        │  │  (dynamic)     │   │
│        │  └────────────────┘   │
│        │                        │
└────────┴────────────────────────┘

Tablet (768px - 1023px)
┌──────────────────────┐
│ Header (compact)     │
├──────────────────────┤
│ Sidebar (full width) │
├──────────────────────┤
│ Main Content         │
│ (full width)         │
│                      │
│ Tab Content          │
│ (stacked)            │
└──────────────────────┘

Mobile (<768px)
┌────────┐
│ Header │
├────────┤
│Sidebar │
├────────┤
│ Main   │
│Content │
│        │
│ Tabs & │
│Content │
│(stack) │
└────────┘
```

## 🔌 Service Integration

```
internship.service.js
│
├── MOCK_INTERNSHIPS (array)
│   ├── Internship 1
│   │   └── Full Stack Web Development
│   ├── Internship 2
│   │   └── Data Science Fundamentals
│   └── Internship 3
│       └── Corporate Software Engineering
│
├── fetchMyInternships()
│   │
│   ├── Step 1: Get Auth Token
│   │   └── auth.currentUser.getIdToken()
│   │
│   ├── Step 2: Try API Call
│   │   └── GET /api/internships/my
│   │
│   ├── Step 3: Handle Response
│   │   ├── Success: return API data
│   │   └── Error: return MOCK_INTERNSHIPS
│   │
│   └── Step 4: Return Data to Component
│
└── State Updates in InternDashboard
    ├── setInternships(data)
    ├── setSelectedInternship(data[0])
    └── setLoading(false)
```

## 🎯 User Interaction Flow

```
1. Dashboard Load
   └─► Fetch Data ──► Display Internships

2. Select Internship
   └─► Click Card ──► Update Selected ──► Render Content

3. Filter by Tier
   └─► Select Option ──► Filter List ──► Show Filtered Items

4. Switch Tab
   └─► Click Tab Button ──► Update State ──► Show Tab Content

5. Expand Level
   └─► Click Level Card ──► Toggle Expanded ──► Show Tasks

6. View Details
   └─► Hover/Click ──► Show More Info ──► Tooltip/Expand
```

## 📦 State Management

```
InternDashboard State:
│
├── internships: Internship[]
│   └── Array of all user's internships
│
├── selectedInternship: Internship | null
│   └── Currently selected internship
│
├── loading: boolean
│   └── API loading state
│
├── activeTab: "overview" | "progress" | "tasks" | "feedback"
│   └── Currently active tab
│
└── filterTier: "all" | "basic" | "premium" | "corporate"
    └── Current filter for sidebar list

Derived States:
└── filteredInternships = internships.filter(...)
    └── Filtered list based on filterTier
```

---

**Architecture Version: 1.0**  
**Last Updated: January 2025**
