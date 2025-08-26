import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	// If user is already onboarded, redirect to their dashboard
	if (session.user.isOnboarded) {
		redirect("/redirect-user");
	}

	return (
		<div className="min-h-screen bg-gray-900">
			{children}
		</div>
	);
}