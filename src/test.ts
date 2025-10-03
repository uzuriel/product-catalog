import { products } from "./db/schema";
import { db } from "./index";

async function main() {
  const user: typeof products.$inferInsert = {
    name: "AULA F75",
    description: "RGB Gaming Keyboard with Blue Switches",
    price: 10000,
    stock: 100,
    category: "Keyboard",
    imageUrl:
      "https://www.whatgeek.com/cdn/shop/files/AULA_L99_Tri-mode_Mechanical_Keyboard_2.jpg?v=1759126210&width=300",
    createdAt: new Date(),
  };
  await db.insert(products).values(user);
  console.log("New product created!");
}
main();
