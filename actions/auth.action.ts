"use server";

import { redirect } from "next/navigation";
import { createSession, updateTokens } from "@/actions/session";
import { FormState, LoginFormSchema, SignupFormSchema } from "@/types/auth.type";

import { BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/authFetch";

export const getProfile = async () => {
	// const session = await getSession();
	// const response = await fetch(`${BACKEND_URL}/auth/protected`, {
	// 	headers: {
	// 		authorization: `Bearer ${session?.accessToken}`,
	// 	},
	// });

	const response = await authFetch(`${BACKEND_URL}/auth/protected`);

	const result = await response.json();
	return result;
};

export async function loginUser(credentials: { email: string; password: string }) {
	const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
		method: "POST",
		body: JSON.stringify(credentials),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Invalid credentials");
	}

	const { user, tokens } = await res.json();

	await createSession({
		user: {
			id: user.id,
			name: `${user.firstName} ${user.lastName}`,
			role: user.role,
		},
		accessToken: tokens.accessToken,
		refreshToken: tokens.refreshToken,
	});
}

export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
	const validationFields = SignupFormSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validationFields.success) {
		return {
			error: validationFields.error.flatten().fieldErrors,
		};
	}

	const response = await fetch(`${BACKEND_URL}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(validationFields.data),
	});
	if (response.ok) {
		redirect("/auth/signin");
	} else
		return {
			message: response.status === 409 ? "The user is already existed!" : response.statusText,
		};
}

export async function signIn(state: FormState, formData: FormData): Promise<FormState> {
	console.log("server action hit");
	const validatedFields = LoginFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const response = await fetch(`${BACKEND_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(validatedFields.data),
	});

	if (response.ok) {
		const result = await response.json();

		console.log(result, "my url");
		await createSession({
			user: {
				id: result.user.id,
				name: result.user.name,
				role: result.user.role,
			},
			accessToken: result.accessToken,
			refreshToken: result.refreshToken,
		});

		redirect("/redirect-user"); //page that takes user to appropriate dashboard page based on role
	} else {
		return {
			message: response.status === 401 ? "Invalid Credentials!" : response.statusText,
		};
	}
}

export const refreshToken = async (oldRefreshToken: string) => {
	try {
		const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				refreshToken: oldRefreshToken,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to refresh token");
		}

		const { accessToken, refreshToken } = await response.json();

		await updateTokens({ accessToken, refreshToken });

		return accessToken;
	} catch (err) {
		console.error("Refresh Token failed:", err);
		return null;
	}
};
