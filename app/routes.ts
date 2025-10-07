import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  // pages
  layout("layout/layout.tsx", [
    route("", "routes/pages/HomePage.tsx"),
    route("products", "routes/pages/ProductsPage.tsx"),
    route("products/:productId", "routes/pages/ProductDetailPage.tsx"),
  ]),

  // auth
  layout("layout/authLayout.tsx", [
    route("login", "routes/auth/LoginPage.tsx"),
    route("signup", "routes/auth/SignupPage.tsx"),
    route("logout", "routes/auth/logout.ts"),
  ]),

  // api
  route("api/hello", "routes/api/hello.ts"),
  route("api/products", "routes/api/products.ts"),
  route("api/products/:id", "routes/api/products.$id.ts"),
  route("api/cart", "routes/api/cart.ts"),
  route("api/cart/:id", "routes/api/cart.$id.ts"),
] satisfies RouteConfig;
