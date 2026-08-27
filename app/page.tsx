import { redirect } from "next/navigation";

/**
 * Root route: no UI of its own. Sends the visitor to the right place
 * based on auth/role state once useAuth/middleware are wired to real
 * session data. For now, defaults to /login.
 */
export default function RootPage() {
  redirect("/login");
}
