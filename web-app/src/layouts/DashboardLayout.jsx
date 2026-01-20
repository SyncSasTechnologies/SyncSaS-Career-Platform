import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <>
      <h2>Dashboard</h2>
      <Outlet />
    </>
  )
}
