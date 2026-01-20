# Copilot Instructions for SyncSaS Platform

## Architecture Overview
This is a full-stack internship and mentoring platform with role-based access (intern, mentor, admin, etc.).
- **Backend**: Express.js API with MongoDB (Mongoose) + Firebase Admin for authentication.
- **Frontend**: React (Vite) with Firebase client auth, React Router, and Axios for API calls.
- **Data Flow**: Frontend authenticates via Firebase, sends ID tokens to backend; backend verifies tokens and fetches user roles from MongoDB.

## Key Patterns
- **Backend Controllers**: Export async functions (e.g., `registerUser`, `getCurrentUser` in `user.controller.js`). Use try/catch with 500 status for errors.
- **Middleware Chain**: Routes apply `authMiddleware` first (verifies Firebase token, sets `req.user`), then role-specific middleware (e.g., `adminMiddleware` checks `user.roles.admin`).
- **Frontend Auth**: Use `AuthContext` for Firebase user state, `RoleContext` for DB roles. Protect routes with `ProtectedRoute` + `RoleRoute`.
- **API Calls**: Services (e.g., `user.service.js`) use Axios with `Authorization: Bearer ${token}` from `auth.currentUser.getIdToken()`.
- **Role Checks**: Backend checks `user.roles.roleName` (boolean); frontend uses `useRole()` hook.

## Developer Workflows
- **Start Backend**: `cd backend && npm run dev` (runs `nodemon server.js` on port 5000).
- **Start Frontend**: `cd web-app && npm run dev` (Vite dev server, typically port 5173).
- **Build Frontend**: `cd web-app && npm run build` (outputs to `dist/`).
- **Lint**: `cd web-app && npm run lint` (ESLint with React rules).

## File Structure Highlights
- **Backend Routes**: Organized in `routes/` with subfolders (`admin/`, `mentor/`) for role-specific endpoints.
- **Frontend Modules**: `modules/` for shared features (e.g., `internship/`), `admin/` and `mentor/` for role-specific UIs.
- **Models**: Mongoose schemas in `models/` (e.g., `User.model.js` with roles object).
- **Layouts**: `layouts/` for page structures; nested routes in `AppRoutes.jsx` use `<Outlet />`.

## Conventions
- User registration creates MongoDB user with all roles false; roles assigned separately.
- API base: `http://localhost:5000/api/` (update for production).
- Firebase config in `config/firebase.js` (backend) and `auth/firebase.js` (frontend).
- Avoid direct DB queries in controllers; use models.

## Common Tasks
- Adding new role: Update `User.model.js` roles object, add middleware, update `RoleRoute` in frontend.
- New API endpoint: Create controller function, add to routes with appropriate middleware.
- Frontend feature: Add to `modules/` if shared, or role folder; use `useRole()` for conditional rendering.</content>
<parameter name="filePath">c:\Users\sheik\sync-career\.github\copilot-instructions.md