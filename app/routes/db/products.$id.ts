import { db } from "../../../src/index";
import { products } from "../../../src/db/schema";
import { eq } from "drizzle-orm";

export async function getOneProductFromDb(id: number) {
  return await db.select().from(products).where(eq(products.id, id).getSQL());
}
