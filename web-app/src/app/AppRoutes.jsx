import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminInternships from "../admin/internship/Internships"
import AdminEnrollments from "../admin/internship/Enrollments"



/* ===== Layouts ===== */
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../admin/layout/AdminLayout";

/* ===== Route Guards ===== */
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

/* ===== Auth ===== */
import Login from "../auth/Login";
import Register from "../auth/Register";

/* ===== Common ===== */
import Navbar from "../common/Navbar";
import Home from "../pages/Home";

/* ===== Internship Module ===== */
import InternshipList from "../modules/internship/pages/InternshipList";
import InternshipDetail from "../modules/internship/pages/InternshipDetail";
import EnrollInternship from "../modules/internship/pages/EnrollInternship";
import InternDashboard from "../modules/internship/pages/InternDashboard";

/* ===== Mentor ===== */
import MentorDashboard from "../modules/internship/mentor/MentorDashboard";
import MentorLayout from "../mentor/layout/MentorLayout"
import CreateInternship from "../mentor/internships/CreateInternship"
import MyInternships from "../mentor/internships/MyInternships"
import InternshipEnrollments from "../mentor/enrollments/InternshipEnrollments"
import Tasks from "../mentor/tasks/Tasks"
import Submissions from "../mentor/tasks/Submissions"
import Performance from "../mentor/analytics/Performance"

/* ===== Admin ===== */
import AdminDashboard from "../admin/dashboard/AdminDashboard";
import AllUsers from "../admin/users/AllUsers";
import Recommendations from "../admin/internship/Recommendations"


/* ===== User Dashboard ===== */
import { useAuth } from "../auth/AuthContext";

/* ===== Dashboard Page ===== */
function Dashboard() {
  const { user } = useAuth();
  return <h1>Welcome {user?.email}</h1>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/internships" element={<InternshipList />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= INTERN ================= */}
        <Route
          path="/internships/enroll/:id"
          element={
            <ProtectedRoute>
              <EnrollInternship />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intern/dashboard"
          element={
            <ProtectedRoute>
              <InternDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= MENTOR ================= */}
        <Route
  path="/mentor"
  element={
    <ProtectedRoute>
      <RoleRoute role="mentor">
        <MentorLayout />
      </RoleRoute>
    </ProtectedRoute>
  }
>
  <Route path="internships" element={<MyInternships />} />
  <Route path="internships/create" element={<CreateInternship />} />
  <Route
  path="enrollments/:internshipId"
  element={<InternshipEnrollments />}
/>
  <Route index element={<MentorDashboard />} />
  <Route path="tasks/:internshipId" element={<Tasks />} />
<Route path="tasks/:internshipId/submissions/:taskId" element={<Submissions />} />
<Route path="analytics/:internshipId" element={<Performance />} />
</Route>


        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <AdminLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="internships" element={<AdminInternships />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="recommendations" element={<Recommendations />} />

        </Route>

        {/* ================= USER DASHBOARD ================= */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
