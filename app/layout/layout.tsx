import { Outlet, useLoaderData } from "react-router";
import Navbar from "src/components/Navbar";
import { getSession } from "~/session";
import type { Route } from "./+types/layout";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const user = session.get("user");
  return { user };
}

export default function LayoutPage() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <section className="min-h-screen flex flex-col bg-[url('/bg.png')] bg-cover bg-no-repeat font-poppins">
      {/* 🧭 Navbar — scrolls away with page */}
      <Navbar user={user} />

      {/* 🧩 Outlet content — fills space and scrolls only when needed */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </section>
  );
}
