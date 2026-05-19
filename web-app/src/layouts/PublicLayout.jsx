import { Outlet } from 'react-router-dom'
import Navbar from '../common/Navbar'

export default function PublicLayout() {
  return (
    <>
      <Navbar variant="public" />
      <Outlet />
    </>
  )
}
