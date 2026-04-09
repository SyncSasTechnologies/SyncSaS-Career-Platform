import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminInternships from "../admin/internship/Internships";
import AdminEnrollments from "../admin/internship/Enrollments";

import ProfilePage from "../modules/freelance/freelancer-module/profile/ProfilePage";
import SkillsPage from "../modules/freelance/freelancer-module/skills/SkillsPage";
import DashboardPage from "../modules/freelance/freelancer-module/dashboard/DashboardPage";

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
import Home from "../pages/Home";

/* ===== Admin ===== */
import AdminDashboard from "../admin/dashboard/AdminDashboard";
import AllUsers from "../admin/users/AllUsers";
import Recommendations from "../admin/internship/Recommendations";

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
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
          <Route path="/freelancer/dashboard" element={<DashboardPage />} />
          <Route path="/freelancer/profile" element={<ProfilePage />} />
          <Route path="/freelancer/skills" element={<SkillsPage />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;