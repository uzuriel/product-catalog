import { Outlet } from "react-router";
import Navbar from "src/components/Navbar";

export default function LayoutPage() {
  return (
    <div className="min-h-screen bg-[url('/bg.png')] bg-cover bg-no-repeat font-poppins">
      <Navbar />
      <Outlet />
    </div>
  );
}
