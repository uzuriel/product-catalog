import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layout/layout.tsx", [
    route("", "routes/HomePage.tsx"),
    route("products", "routes/ProductsPage.tsx"),
    route("products/:productId", "routes/ProductDetailPage.tsx"),
    route("about-us", "routes/AboutPage.tsx"),
  ]),

  route("api/hello", "routes/api/hello.ts"),
  route("api/products", "routes/api/products.ts"),
  route("api/products/:id", "routes/api/products.$id.ts"),
] satisfies RouteConfig;
