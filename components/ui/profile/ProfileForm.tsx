"use client";
import { authFetch } from "@/lib/authFetch";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/constants";
import { useState } from "react";

export default function ProfileForm({ profile }: { profile: any }) {
	const [form, setForm] = useState(profile);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Call your update profile endpoint (via fetch or server action)
		await authFetch("/users/me", {
			method: "PUT",
			body: JSON.stringify(form),
			headers: { "Content-Type": "application/json" },
		});
		// Optionally show success/error
	};
	const getProfile = async () => {
		console.log(NEXT_PUBLIC_BACKEND_URL, "url");
		const res = await authFetch(`${NEXT_PUBLIC_BACKEND_URL}/users/me`, {});
		const profile = await res.json();

		console.log(profile, "profiel");
	};

	return (
		<div>
			<button onClick={() => getProfile()}>FETch</button>

			<form onSubmit={handleSubmit}>
				<input name="name" value={form.name} onChange={handleChange} />
				<input name="gender" value={form.gender} onChange={handleChange} />
				<input name="country" value={form.country} onChange={handleChange} />
				{/* Add image upload, etc. */}
				<button type="submit">Update</button>
			</form>
		</div>
	);
}
