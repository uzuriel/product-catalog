// app/routes/logout.ts
import { redirect } from "react-router";
import { sessionStorage } from "~/session";

export async function action({ request }: { request: Request }) {
  const cookieHeader = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookieHeader);

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function loader() {
  return redirect("/");
}
