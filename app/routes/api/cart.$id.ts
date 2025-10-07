import { db } from "../../../src/index";
import { cart } from "../../../src/db/schema";
import { and, eq } from "drizzle-orm";
import { getSession } from "../../session";

export async function action({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const session = await getSession(request);
  const user = session.get("user");

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);

  if (request.method === "POST") {
    // 🟢 Update quantity
    const body = await request.json();
    const quantity = Number(body.quantity);

    if (isNaN(quantity) || quantity < 0) {
      return Response.json({ error: "Invalid quantity" }, { status: 400 });
    }

    await db
      .update(cart)
      .set({ quantity })
      .where(and(eq(cart.userId, user.id), eq(cart.productId, id)));

    return Response.json({ success: true });
  }

  if (request.method === "DELETE") {
    // 🔴 Delete product from cart
    await db
      .delete(cart)
      .where(and(eq(cart.userId, user.id), eq(cart.productId, id)));
    return Response.json({ success: true });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
