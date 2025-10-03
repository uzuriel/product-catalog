import { type RouteConfig, index, route } from "@react-router/dev/routes";
import layout from "./layout/layout";

export default [
  index("routes/HomePage.tsx"),
  route("products", "routes/ProductsPage.tsx"),
  route("about-us", "routes/AboutPage.tsx"),

  route("api/hello", "routes/api/hello.ts"),
  route("api/products", "routes/api/products.ts"),
] satisfies RouteConfig;
