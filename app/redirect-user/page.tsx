import { getSession, redirectToAppropriateRoute } from "@/actions/session";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
	const session = await getSession();
	
	if (!session) {
		redirect("/login");
	}

	// Use the session helper to redirect to appropriate route
	// This handles user type, role, and onboarding status
	await redirectToAppropriateRoute(session);
}
