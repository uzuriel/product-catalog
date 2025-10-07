import { Form, NavLink, redirect } from "react-router";
import bcrypt from "bcryptjs";
import { db } from "../../../src/index";
import { users } from "../../../src/db/schema";
import { eq } from "drizzle-orm";
import { getSession, sessionStorage } from "../../session";
import type { Route } from "./+types/SignupPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup" },
    { name: "description", content: "Product Catalog" },
  ];
}
export async function loader({ request }: { request: Request }) {
  // 🧠 Prevent logged-in users from accessing signup page
  const session = await getSession(request);
  const user = session.get("user");
  if (user) {
    throw redirect("/");
  }
  return null;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !email || !password) {
    return Response.json({ error: "All fields required" }, { status: 400 });
  }

  // Check for existing email
  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) {
    return Response.json({ error: "Email already exists" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // 1️⃣ Insert the new user
  await db.insert(users).values({
    username,
    email,
    passwordHash,
    createdAt: new Date(),
  });

  // 2️⃣ Fetch the inserted user manually
  const newUser = await db.query.users.findFirst({
    where: eq(users.email, email),
    columns: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!newUser) {
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }

  // 3️⃣ Store the full user object in session
  const session = await sessionStorage.getSession();
  session.set("user", newUser);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function SignupPage() {
  return (
    <section className="min-h-screen max-w-xl mx-auto p-12 lg:p-8 flex flex-col justify-center gap-4">
      <figure className="flex justify-center">
        <img src="/logo.svg" alt="Logo" className="h-16 w-24" />
      </figure>
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Form method="post" className="flex flex-col gap-3">
        <input
          name="username"
          placeholder="Username"
          className="input w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input w-full"
        />
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </Form>
      <p className="flex flex-row justify-center text-primary-content">
        Already have an account?
        <NavLink to="/login" end className="text-highlight-gold ml-1">
          Login
        </NavLink>
      </p>
    </section>
  );
}
