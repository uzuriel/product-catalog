import type { Route } from "./+types/HomePage";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AULA" },
    { name: "description", content: "Product Catalog" },
  ];
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home() {
  return (
    <main>
      <section className="flex flex-col justify-center items-center gap-4">
        <h1>
          Shaping The{" "}
          <span className="text-highlight-gold">Future of Play</span>
        </h1>
        <h2>
          AULA blends innovation and precision to create gear that empowers
          every gamer.
        </h2>
        <NavLink to="/about-us" end>
          <button className="btn bg-[linear-gradient(270deg,_#5151C0_0%,_#5F5FA2_51%,_#7777EC_86%)] flex flex-row items-center justify-center gap-2 rounded-xl border-0 shadow-sm text-primary-content">
            <h3 className="text-primary-content">Discover AULA</h3>
            <img src="/right-arrow.svg" alt="Logo" className="size-5" />
          </button>
        </NavLink>
        <img src="/keyboard-front.svg" alt="Logo" className="mt-11" />
      </section>
      <section className="flex flex-col justify-center items-center gap-4 mt-36">
        <h1>Find Your Perfect Setup</h1>
        <h2>
          Premium gaming peripherals crafted for power, speed, and precision.
        </h2>
        <NavLink to="/products" end>
          <button className="btn bg-[linear-gradient(270deg,_#5151C0_0%,_#5F5FA2_51%,_#7777EC_86%)] flex flex-row items-center justify-center gap-2 rounded-xl border-0 shadow-sm text-primary-content">
            <h3 className="text-primary-content">Explore AULA</h3>
            <img src="/right-arrow.svg" alt="Logo" className="size-5" />
          </button>
        </NavLink>
      </section>
    </main>
  );
}
