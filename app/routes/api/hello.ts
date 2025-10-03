import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  // You can return JSON
  return Response.json({ message: "Hello from API!" });
}
