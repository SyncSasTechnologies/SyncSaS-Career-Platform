import { Navigate } from "react-router-dom"
import { useRole } from "../auth/RoleContext"

export default function RoleRoute({ role, children }) {
  const { roles } = useRole()

  if (!roles || !roles[role]) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
