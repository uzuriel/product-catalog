import { Outlet } from "react-router";

export default function LayoutPage() {
  return (
    <section className="min-h-screen bg-[url('/bg.png')] bg-cover bg-no-repeat font-poppins">
      <Outlet />
    </section>
  );
}
