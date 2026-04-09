import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

export default function InternshipLayout() {
  return (
    <>
      <Navbar variant="intern" />
      <Outlet />
    </>
  );
}
