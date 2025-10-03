import type { LoaderFunctionArgs } from "react-router";
import { getProductsFromDb } from "../db/products";

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await getProductsFromDb();
  return Response.json(data);
}
