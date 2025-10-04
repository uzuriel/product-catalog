import { data, useLoaderData } from "react-router";
import type { Route } from "./+types/ProductDetailPage";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.productId}`);
  const product = await res.json();
  console.log(product);
  return product;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function ProductDetailPage({
  loaderData,
}: Route.ComponentProps) {
  const { products } = loaderData();
  console.log(products);
  console.log(products.id);

  return <div>ProductDetailPage</div>;
}
