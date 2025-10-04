import { redirect } from "react-router";
import { getSession } from "~/session";

// 🔒 Redirect logged-in users away from login/signup pages
export async function requireLoggedOut(request: Request) {
  const session = await getSession(request);
  const user = session.get("user");

  if (user) {
    throw redirect("/"); // already logged in → go home
  }
  return null;
}

// 🔐 Require login for protected routes
export async function requireUser(request: Request) {
  const session = await getSession(request);
  const user = session.get("user");

  if (!user) {
    throw redirect("/login");
  }

  return user;
}
