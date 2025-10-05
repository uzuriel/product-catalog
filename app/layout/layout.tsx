import { Outlet } from "react-router";
import Navbar from "src/components/Navbar";
import { getSession } from "~/session";

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request);
  const user = session.get("user") || null;
  return { user };
}

export default function LayoutPage({ loaderData, children }: any) {
  const { user } = loaderData;
  return (
    <section className="min-h-screen bg-[url('/bg.png')] bg-cover bg-no-repeat font-poppins">
      <Navbar user={user} />
      <Outlet />
    </section>
  );
}
