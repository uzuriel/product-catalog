import { Form, NavLink, redirect } from "react-router";
import bcrypt from "bcryptjs";
import { db } from "../../../src/index";
import { users } from "../../../src/db/schema";
import { eq } from "drizzle-orm";
import { sessionStorage, getSession } from "../../session";
import type { Route } from "./+types/LoginPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Product Catalog" },
  ];
}

export async function loader({ request }: { request: Request }) {
  // 🧠 Prevent logged-in users from accessing login page
  const session = await getSession(request);
  const user = session.get("user");
  if (user) {
    throw redirect("/");
  }
  return null;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return Response.json({ error: "Missing credentials" }, { status: 400 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const session = await sessionStorage.getSession();
  session.set("user", {
    id: user.id,
    username: user.username,
    email: user.email,
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function LoginPage() {
  return (
    <section className="min-h-screen max-w-xl mx-auto p-12 lg:p-8 flex flex-col justify-center gap-4">
      <figure className="flex justify-center">
        <img src="/logo.svg" alt="Logo" className="h-16 w-24" />
      </figure>
      <h1 className="text-2xl font-bold">Login</h1>
      <Form method="post" className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input w-full"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input w-full"
          required
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </Form>
      <p className="flex flex-row justify-center text-primary-content">
        Don't have an account?
        <NavLink to="/signup" end className="text-highlight-gold ml-1">
          Sign up
        </NavLink>
      </p>
    </section>
  );
}
