import { addToCart } from "../db/cart";
import { getSession } from "../../session";
import { cart, products } from "src/db/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../src/index";
import { redirect } from "react-router";

export async function action({ request }: { request: Request }) {
  const session = await getSession(request);
  const user = session.get("user");

  if (!user) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const intent = formData.get("intent") || "add";

  // ✅ Handle checkout intent (clear cart)
  if (intent === "checkout") {
    await db.delete(cart).where(eq(cart.userId, user.id));
    return redirect(request.headers.get("referer") || "/");
  }

  // ✅ Handle add-to-cart intent
  const productId = Number(formData.get("productId"));
  const quantity = Number(formData.get("quantity") || 1);

  if (!productId) {
    return Response.json({ error: "Missing productId" }, { status: 400 });
  }

  await addToCart(user.id, productId, quantity);
  return redirect(request.headers.get("referer") || "/");
}

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request);
  const user = session.get("user");

  if (!user) return Response.json({ cart: [] });

  const items = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      imageUrl: products.imageUrl,
      quantity: cart.quantity,
    })
    .from(cart)
    .innerJoin(products, eq(cart.productId, products.id))
    .where(eq(cart.userId, user.id));

  return Response.json({ cart: items });
}
