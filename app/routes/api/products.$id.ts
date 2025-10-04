import type { LoaderFunctionArgs } from "react-router";
import { getOneProductFromDb } from "../db/products.$id";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Response("Product ID not found", { status: 400 });
  }

  // convert id to number if your DB expects a number
  const product = await getOneProductFromDb(Number(id));

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
}
