import type { Route } from "./+types/AboutPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AULA" },
    { name: "description", content: "Product Catalog" },
  ];
}

export default function AboutPage() {
  return <div>AboutPage</div>;
}
