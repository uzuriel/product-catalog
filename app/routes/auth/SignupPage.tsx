import { Form, redirect } from "react-router";
import bcrypt from "bcryptjs";
import { db } from "../../../src/index";
import { users } from "../../../src/db/schema";
import { eq } from "drizzle-orm";
import { getSession, sessionStorage } from "../../session";

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

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) {
    return Response.json({ error: "Email already exists" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    email,
    passwordHash,
    createdAt: new Date(),
  });

  // Auto-login after signup
  const session = await sessionStorage.getSession();
  session.set("user", email);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Form method="post" className="flex flex-col gap-3">
        <input name="username" placeholder="Username" className="input" />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </Form>
    </div>
  );
}
