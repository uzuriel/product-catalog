import { db } from "../../../src/index";
import { cart } from "src/db/schema";
import { eq, and } from "drizzle-orm";

export async function addToCart(
  userId: number,
  productId: number,
  quantity: number
) {
  const existing = await db.query.cart.findFirst({
    where: and(eq(cart.userId, userId), eq(cart.productId, productId)),
  });

  if (existing) {
    await db
      .update(cart)
      .set({ quantity: existing.quantity + quantity })
      .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
  } else {
    await db.insert(cart).values({
      userId,
      productId,
      quantity,
    });
  }

  return { success: true };
}

export async function removeFromCart(userId: number, productId: number) {
  await db
    .delete(cart)
    .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
  return { success: true };
}

export async function getCart(userId: number) {
  return await db.query.cart.findMany({
    where: eq(cart.userId, userId),
  });
}
