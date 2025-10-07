import { Form, useLoaderData } from "react-router";
import type { Route } from "./+types/ProductDetailPage";
import { ShoppingCart } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AULA" },
    { name: "description", content: "Product Catalog" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.productId}`);
  const product = await res.json();
  console.log("Fetched:", product);
  return product;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function ProductDetailPage() {
  const { id, name, description, price, stock, imageUrl, category } =
    useLoaderData<typeof clientLoader>(); // ✅ access loader data correctly
  console.log("Loader Data:", {
    id,
    name,
    description,
    price,
    stock,
    imageUrl,
    category,
  });

  return (
    <main>
      <section className="flex flex-row gap-16 justify-center">
        <figure className="bg-primary-content size-48 lg:size-96 flex items-center justify-stretch">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </figure>
        <section className="flex flex-col gap-8 w-1/2">
          <h3 className="text-primary-content text-4xl font-bold">{name}</h3>
          <p className="text-primary-content text-2xl">{description}</p>
          <h3 className="text-highlight-gold font-bold text-4xl">
            ₱{price.toLocaleString()}
          </h3>
          <h4 className="text-primary-content">Stocks: {stock}</h4>
          <Form
            method="post"
            action="/api/cart"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);

              await fetch("/api/cart", {
                method: "POST",
                body: formData,
                credentials: "include",
              });

              // 🧠 Tell Navbar to update
              window.dispatchEvent(new Event("cart:update"));
            }}
          >
            <input type="hidden" name="productId" value={id} />
            <button
              type="submit"
              className="btn bg-[linear-gradient(270deg,_#5151C0_0%,_#5F5FA2_51%,_#7777EC_86%)] flex flex-row items-center justify-center gap-2 rounded-xl border-0 shadow-sm text-primary-content"
            >
              <ShoppingCart />
              Add to Cart
            </button>
          </Form>
        </section>
      </section>
    </main>
  );
}
