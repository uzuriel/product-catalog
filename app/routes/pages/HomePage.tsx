import { NavLink } from "react-router";
import type { Route } from "./+types/HomePage";
import { getSession } from "~/session";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const user = session.get("user");
  console.log("Logged in user:", user); // 🧠 This runs on the server
  return { user };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AULA" },
    { name: "description", content: "Product Catalog" },
  ];
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  console.log("Client-side user:", user); // 🧠 This runs in browser
  return (
    <main>
      <section className="flex flex-col justify-center items-center gap-8 mt-16">
        <h1>
          Shaping The{" "}
          <span className="text-highlight-gold">Future of Play</span>
        </h1>
        <h2>
          AULA blends innovation and precision to create gear that empowers
          every gamer.
        </h2>
        <NavLink to="/products" end>
          <button className="btn bg-[linear-gradient(270deg,_#5151C0_0%,_#5F5FA2_51%,_#7777EC_86%)] flex flex-row items-center justify-center gap-2 rounded-xl border-0 shadow-sm text-primary-content">
            <h3 className="text-primary-content">Explore AULA</h3>
            <img src="/right-arrow.svg" alt="Logo" className="size-5" />
          </button>
        </NavLink>
        <img src="/keyboard-front.svg" alt="Logo" className="mt-11" />
      </section>
    </main>
  );
}
