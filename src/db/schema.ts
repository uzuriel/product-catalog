import {
  int,
  varchar,
  mysqlTable,
  primaryKey,
  datetime,
  text as mysqlText,
  serial,
} from "drizzle-orm/mysql-core";

// Users table
export const users = mysqlTable("users", {
  id: serial().primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: datetime("created_at").notNull(),
});

// Products table
export const products = mysqlTable("products", {
  id: serial().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: mysqlText("description"),
  price: int("price").notNull(), // price in cents
  stock: int("stock").notNull(),
  imageUrl: varchar("image_url", { length: 512 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: datetime("created_at").notNull(),
});

// Cart table (cart items)
export const cart = mysqlTable(
  "cart",
  {
    userId: int("user_id").notNull(),
    productId: int("product_id").notNull(),
    quantity: int("quantity").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.productId] }),
  })
);
