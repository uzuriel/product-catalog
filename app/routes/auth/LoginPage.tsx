import { Form, redirect } from "react-router";
import bcrypt from "bcryptjs";
import { db } from "../../../src/index";
import { users } from "../../../src/db/schema";
import { eq } from "drizzle-orm";
import { sessionStorage, getSession } from "../../session";

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
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Form method="post" className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
          required
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </Form>
    </div>
  );
}
