# Internship Dashboard - Code Reference & Examples

## 🚀 Quick Reference Guide

### Import & Use the Dashboard

```jsx
// In your AppRoutes.jsx
import InternDashboard from '../modules/internship/pages/InternDashboard'

<Route
  path="/intern/dashboard"
  element={
    <ProtectedRoute>
      <InternDashboard />
    </ProtectedRoute>
  }
/>
```

### Access the Dashboard
```
URL: http://localhost:5173/intern/dashboard
```

---

## 📝 Component Code Examples

### Using DashboardStats Component

```jsx
import DashboardStats from '../components/DashboardStats'

// In your component
<DashboardStats internship={selectedInternship} />

// Component expects internship object with:
{
  currentLevel: 1,
  tasksCompleted: 2,
  performanceScore: 85,
  daysRemaining: 45
}
```

### Using ProgressTracker Component

```jsx
import ProgressTracker from '../components/ProgressTracker'

// In your component
<ProgressTracker internship={selectedInternship} />

// Component expects internship object with:
{
  currentLevel: 1,
  overallProgress: 20,
  levelTasks: {
    level1: [{id, name, status}, ...],
    level2: [...],
    level3: [...]
  }
}
```

---

## 🎨 CSS Customization Examples

### Change Primary Colors

```css
/* In dashboard.css */

/* Old colors */
linear-gradient(135deg, #667eea 0%, #764ba2 100%)

/* Change to your brand colors */
linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)
```

### Modify Button Styles

```css
/* In dashboard.css */

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);  /* Change this */
  color: white;
  padding: 10px 20px;  /* Adjust padding */
  border-radius: 6px;   /* Adjust radius */
}

.btn-primary:hover {
  transform: translateY(-2px);  /* Adjust hover effect */
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);  /* Adjust shadow */
}
```

### Customize Card Styling

```css
.card {
  background: #f9f9f9;  /* Change background */
  border: 1px solid #e0e0e0;  /* Change border */
  border-radius: 10px;  /* Change border radius */
  padding: 20px;  /* Adjust padding */
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);  /* Adjust shadow */
}
```

---

## 📊 Mock Data Examples

### Adding New Mock Internship

```javascript
// In internship.service.js

const newInternship = {
  _id: "4",
  internshipId: "INTERN-004",
  title: "Mobile App Development",
  tier: "Premium",
  status: "active",
  currentLevel: 1,
  progress: 25,
  overallProgress: 15,
  tasksCompleted: 1,
  performanceScore: 80,
  daysRemaining: 70,
  skillsEarned: ["React Native", "JavaScript"],
  tasks: [
    { 
      id: 1, 
      title: "Setup React Native", 
      description: "Install and configure React Native",
      status: "completed", 
      dueDate: "2024-01-25" 
    },
    { 
      id: 2, 
      title: "Build First Screen", 
      description: "Create login screen",
      status: "in-progress", 
      dueDate: "2024-02-01" 
    }
  ],
  mentorFeedback: [
    { 
      mentorName: "Sarah Dev", 
      date: "2024-01-20", 
      comment: "Good understanding of React Native basics",
      rating: 4 
    }
  ],
  levelTasks: {
    level1: [
      { id: 1, name: "Introduction to Mobile Development", status: "completed" },
      { id: 2, name: "Environment Setup", status: "completed" },
      { id: 3, name: "Build First App", status: "in-progress" },
      { id: 4, name: "Submit Project", status: "pending" },
      { id: 5, name: "Pass Assessment", status: "pending" }
    ],
    level2: Array(5).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Intermediate Task ${i + 1}`,
      status: "pending"
    })),
    level3: Array(5).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Advanced Task ${i + 1}`,
      status: "pending"
    }))
  }
}

// Add to MOCK_INTERNSHIPS array
MOCK_INTERNSHIPS.push(newInternship)
```

---

## 🔧 Modification Examples

### Add New Tab to Dashboard

```jsx
// Step 1: Add new state in InternDashboard.jsx
const [activeTab, setActiveTab] = useState("overview")

// Step 2: Add tab button in .dashboard-tabs
<button 
  className={`tab-btn ${activeTab === "certificates" ? "active" : ""}`}
  onClick={() => setActiveTab("certificates")}
>
  🏆 Certificates
</button>

// Step 3: Add conditional rendering in .dashboard-main
{activeTab === "certificates" && (
  <div className="tab-content">
    <div className="card">
      <h3>📜 Your Certificates</h3>
      {/* Certificates content here */}
    </div>
  </div>
)}
```

### Customize Tier Badges

```jsx
// In InternDashboard.jsx or CSS

// Add new tier color in CSS
.tier-elite {
  background: #FFD700;
  color: #333;
  font-weight: bold;
}

// Update JSX
<span className={`tier-badge tier-${internship.tier?.toLowerCase()}`}>
  {internship.tier}
</span>
```

### Change Performance Score Display

```jsx
// In DashboardStats.jsx
// Old: Simple percentage
<span className="stat-value">{stat.value}</span>

// New: With custom formatting
<span className="stat-value">
  {stat.label === 'Performance Score' 
    ? `${stat.value}%` 
    : stat.value
  }
</span>
```

---

## 🔄 API Integration Examples

### Connect Real API Endpoint

```javascript
// In internship.service.js

export const fetchMyInternships = async () => {
  try {
    const token = await auth.currentUser?.getIdToken()

    // Your actual API endpoint
    const res = await axios.get(
      'http://localhost:5000/api/internships/my',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (err) {
    console.error('Error fetching internships:', err)
    throw err  // Re-throw to handle in component
  }
}
```

### Handle API Errors in Component

```jsx
// In InternDashboard.jsx
useEffect(() => {
  const loadData = async () => {
    try {
      const data = await fetchMyInternships()
      setInternships(data)
    } catch (err) {
      console.error(err)
      // Show error message to user
      setError('Failed to load internships. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  loadData()
}, [])
```

---

## 📱 Responsive Design Tips

### Test Responsive Layout

```bash
# Use DevTools in browser
Right-click → Inspect → Toggle Device Toolbar (Ctrl+Shift+M)

# Test breakpoints:
# Desktop: 1400px
# Tablet: 800px
# Mobile: 375px
```

### Add New Responsive Rule

```css
/* Add to CSS file */

@media (max-width: 600px) {
  .your-element {
    /* Mobile styles */
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
}
```

---

## 🧪 Testing Examples

### Test Tab Switching

```javascript
// In browser console
// 1. Open dashboard
// 2. Click different tabs
// 3. Verify content changes
// 4. Check console for errors

// To verify state: Open React DevTools
// Look for InternDashboard component
// Check activeTab in state
```

### Test Data Loading

```javascript
// In browser console
// Add this to test mock data

// Force mock data
localStorage.setItem('USE_MOCK_DATA', 'true')

// Clear cache
localStorage.clear()

// Check network tab for API calls
// Right-click → Inspect → Network tab
```

### Test Responsive Design

```javascript
// Resize window to test breakpoints
window.addEventListener('resize', () => {
  console.log('Current width:', window.innerWidth)
})

// Test at specific breakpoints:
// 1024px - Desktop/Tablet threshold
// 768px - Tablet/Mobile threshold
// 480px - Small mobile
```

---

## 🎯 Performance Tips

### Optimize Re-renders

```jsx
// Use useCallback for event handlers
import { useCallback } from 'react'

const handleTabClick = useCallback((tab) => {
  setActiveTab(tab)
}, [])

<button onClick={() => handleTabClick('progress')}>Progress</button>
```

### Optimize List Rendering

```jsx
// Use key prop correctly (from service.js)
{filteredInternships.map((internship) => (
  <div key={internship._id}>  // ✓ Unique ID
    {internship.title}
  </div>
))}

// Not like this:
// <div key={index}>  ✗ Avoid using index
```

---

## 📋 Debugging Checklist

- [ ] Check browser console for errors
- [ ] Verify mock data is loading
- [ ] Test all tab switches
- [ ] Check responsive layout on mobile
- [ ] Verify CSS is loading
- [ ] Check API calls in Network tab
- [ ] Test with empty state
- [ ] Verify hover effects work
- [ ] Check animations smooth
- [ ] Test on different browsers

---

## 🔗 Quick Links

### Important Files
- Main Dashboard: `src/modules/internship/pages/InternDashboard.jsx`
- Stats Component: `src/modules/internship/components/DashboardStats.jsx`
- Progress Tracker: `src/modules/internship/components/ProgressTracker.jsx`
- Main CSS: `src/modules/internship/styles/dashboard.css`
- Progress CSS: `src/modules/internship/styles/progress-tracker.css`
- Services: `src/modules/internship/services/internship.service.js`

### Documentation
- Full Guide: `INTERNSHIP_DASHBOARD_GUIDE.md`
- Architecture: `ARCHITECTURE_DIAGRAM.md`
- Summary: `DASHBOARD_SUMMARY.md`

---

## 🎓 Common Issues & Solutions

### Issue: Dashboard Not Loading
**Solution:**
```javascript
// Check browser console for errors
// Verify route is correct: /intern/dashboard
// Check if ProtectedRoute is working
// Verify auth context is available
```

### Issue: Mock Data Not Showing
**Solution:**
```javascript
// In browser console
import { fetchMyInternships } from './services/internship.service'
await fetchMyInternships()
  .then(data => console.log('Data:', data))
  .catch(err => console.log('Error:', err))
```

### Issue: CSS Not Applied
**Solution:**
```javascript
// 1. Check import in component
import '../styles/dashboard.css'

// 2. Clear browser cache (Ctrl+Shift+Delete)
// 3. Restart dev server
// 4. Check CSS file exists
// 5. Verify no CSS conflicts
```

### Issue: Tab Content Not Switching
**Solution:**
```javascript
// Check activeTab state is updating
// Verify conditional rendering logic
// Check for CSS z-index issues
// Console log activeTab to verify state
```

---

## 📚 Learning Resources

### Topics Covered
- React Hooks (useState, useEffect)
- Conditional Rendering
- CSS Grid & Flexbox
- Responsive Design
- Component Composition
- State Management
- API Integration
- Error Handling

### Recommended Reading
- React Docs: https://react.dev
- CSS Grid: https://css-tricks.com/snippets/css/complete-guide-grid/
- Flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

---

**Code Reference Version: 1.0**  
**Last Updated: January 2025**
