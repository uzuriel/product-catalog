import { useLoaderData } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/ProductsPage";

import ProductCard from "src/components/ProductCard";
import Searchbar from "src/components/Searchbar";
import type { ProductProps } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AULA" },
    { name: "description", content: "Product Catalog" },
  ];
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

// Page loader: runs server-side
export async function loader() {
  const products = await fetch("http://localhost:5173/api/products").then(
    (res) => res.json()
  );
  return { products };
}

export default function ProductsPage() {
  const { products } = useLoaderData() as { products: ProductProps[] };

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // how many products per page

  // Filter products by name
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <main>
      <h1>
        Every Press, <span className="text-highlight-gold">Perfected</span>
      </h1>
      <h2>Power. Speed. Reliability. All in your hands.</h2>

      {/* search bar */}
      <section className="flex justify-center mt-4 mb-10">
        <Searchbar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setCurrentPage(1); // reset to page 1 when searching
          }}
        />
      </section>

      <section className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center">
        {currentProducts.map((p) => (
          <ProductCard
            key={p.id}
            productId={p.id}
            imageUrl={p.imageUrl}
            name={p.name}
            description={p.description}
            price={p.price}
          />
        ))}
      </section>

      {/* pagination */}
      {totalPages > 1 && (
        <section className="flex justify-center mt-6">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              «
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              // Show first, last, current, and neighbors
              if (
                i + 1 === 1 ||
                i + 1 === totalPages ||
                Math.abs(currentPage - (i + 1)) <= 1
              ) {
                return (
                  <button
                    key={i}
                    className={`join-item btn ${
                      currentPage === i + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                );
              }

              // Show "..." between gaps
              if (i + 1 === currentPage - 2 || i + 1 === currentPage + 2) {
                return (
                  <button key={i} className="join-item btn btn-disabled">
                    ...
                  </button>
                );
              }

              return null;
            })}

            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              »
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
