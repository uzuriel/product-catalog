// app/routes/api/cartCount.ts
import { db } from "../../../src/index";
import { cart } from "../../../src/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "../../session";

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request);
  const user = session.get("user");

  if (!user?.id) {
    return Response.json({ count: 0 });
  }

  const cartItems = await db.query.cart.findMany({
    where: eq(cart.userId, user.id),
    columns: {
      productId: true,
    },
  });

  const uniqueProducts = new Set(cartItems.map((item) => item.productId));
  return Response.json({ count: uniqueProducts.size });
}
