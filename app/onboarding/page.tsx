import { getSession } from "@/actions/session";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default async function OnboardingPage() {
	const session = await getSession();

	if (!session) {
		return null; // Will be redirected by layout
	}

	return <OnboardingFlow session={session} />;
}