import { db } from "../../../src/index";
import { products } from "../../../src/db/schema";

export async function getProductsFromDb() {
  return await db.select().from(products);
}
