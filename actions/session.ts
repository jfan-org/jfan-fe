"use server";

import { UserRole, UserType } from "@/types/auth.types";
import { Role } from "@/types/auth.type"; // Keep for backward compatibility
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDashboardRoute } from "@/lib/user-types.config";

export interface Session {
	user: {
		id: string;
		name: string;
		email: string;
		role: UserRole;
		userType: UserType;
		isOnboarded: boolean;
	};
	accessToken: string;
	refreshToken: string;
}

// Legacy session type for backward compatibility
export type LegacySession = {
	user: {
		id: string;
		name: string;
		email: string;
		role: Role;
	};
	accessToken: string;
	refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session | LegacySession) {
	const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	// Convert legacy session to new format if needed
	const sessionPayload: Session =
		"userType" in payload.user
			? (payload as Session)
			: {
					...(payload as LegacySession),
					user: {
						...payload.user,
						role: payload.user.role as UserRole,
						userType: UserType.TALENT, // Default for legacy sessions
						isOnboarded: false, // Default for legacy sessions
					},
			  };

	const session = await new SignJWT(sessionPayload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);

	const cookieStore = await cookies();
	cookieStore.set("session", session, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		expires: expiredAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function getSession(): Promise<Session | null> {
	const cookieStore = await cookies();

	const cookie = cookieStore.get("session")?.value;
	if (!cookie) return null;

	try {
		const { payload } = await jwtVerify(cookie, encodedKey, {
			algorithms: ["HS256"],
		});

		return payload as Session;
	} catch (err) {
		console.error("Failed to verify the session", err);
		return null;
	}
}

export async function updateSession(updates: Partial<Session["user"]>) {
	const session = await getSession();
	if (!session) return null;

	const newPayload: Session = {
		...session,
		user: {
			...session.user,
			...updates,
		},
	};

	await createSession(newPayload);
	return newPayload;
}

export async function deleteSession() {
	const cookieStore = await cookies();
	await cookieStore.delete("session");
}

export async function updateTokens({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("session")?.value;
	if (!cookie) return null;

	const { payload } = await jwtVerify<Session>(cookie, encodedKey);

	if (!payload) throw new Error("Session not found");

	const newPayload: Session = {
		user: {
			...payload.user,
		},
		accessToken,
		refreshToken,
	};

	await createSession(newPayload);
}

// Session validation helpers
export async function validateSession(): Promise<Session | null> {
	try {
		const session = await getSession();
		if (!session) return null;

		// Additional validation can be added here
		return session;
	} catch (error) {
		console.error("Session validation failed:", error);
		return null;
	}
}

export async function requireSession(): Promise<Session> {
	const session = await getSession();
	if (!session) {
		redirect("/login");
	}
	return session;
}

export async function requireOnboardedSession(): Promise<Session> {
	const session = await requireSession();
	if (!session.user.isOnboarded) {
		redirect("/onboarding");
	}
	return session;
}


export async function redirectToAppropriateRoute(session?: Session) {
	const currentSession = session || (await getSession());

	if (!currentSession) {
		redirect("/login");
	}

	const { getRedirectUrl } = await import("@/lib/Authorization");
	const redirectUrl = getRedirectUrl(currentSession);
	redirect(redirectUrl);
}

// Mark user as onboarded
export async function completeOnboarding(): Promise<Session | null> {
	return await updateSession({ isOnboarded: true });
}
