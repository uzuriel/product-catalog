import { db } from "../../../src/index";
import { products } from "../../../src/db/schema";
import { eq } from "drizzle-orm";

export async function getOneProductFromDb(id: number) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  return product; // ✅ returns a single object or null
}
