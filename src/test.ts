import { products } from "./db/schema";
import { db } from "./index";

async function main() {
  const user: typeof products.$inferInsert = {
    name: "AULA 321321",
    description:
      "RGB High-Performance Mechanical Gaming Keyboard with Clicky Blue Switches, Full RGB Backlighting, Customizable Macro Keys, Anti-Ghosting Technology, Ergonomic Design, Durable Aluminum Frame, Multimedia Controls, and Compatible with PC, Mac, and Gaming Laptops",
    price: 1000000,
    stock: 100,
    category: "Keyboard",
    imageUrl:
      "https://progearcambodia.com/wp-content/uploads/2024/01/2-scaled.jpg",
    createdAt: new Date(),
  };
  await db.insert(products).values(user);
  console.log("New product created!");
}
main();
