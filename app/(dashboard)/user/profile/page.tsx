import { getSession } from "@/actions/session";
import ProfileForm from "@/components/ui/profile/ProfileForm";
import { authFetch } from "@/lib/authFetch";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/constants";

export default async function EmployerProfilePage() {
	const session = await getSession();
	if (!session) return null;

	// Fetch profile data from your backend
	const res = await authFetch(`${NEXT_PUBLIC_BACKEND_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${session.accessToken}`,
		},
		cache: "no-store",
	});

	if (!res.ok) {
		return <div>Failed to load profile</div>;
	}

	const profile = await res.json();

	return (
		<div>
			<h1>Profile</h1>
			<p>Name: {profile.firstName}</p>
			<p>Gender: {profile.gender}</p>
			<p>Country: {profile.country}</p>
			{/* Render image, etc. */}
			<ProfileForm profile={profile} />
		</div>
	);
}
