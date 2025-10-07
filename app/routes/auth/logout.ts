import { redirect } from "react-router";
import { sessionStorage } from "../../session"; // adjust the path if needed

export async function action({ request }: { request: Request }) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  // Destroy the session cookie
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function loader({ request }: { request: Request }) {
  // Support GET requests too — just redirect and destroy session
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export default function LogoutPage() {
  return null;
}
