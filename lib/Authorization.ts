import { UserRole, UserType } from "@/types/auth.types";
import { Session } from "@/actions/session";

export function hasRole(session: Session | null, allowed: UserRole[]) {
	if (!session) return false;
	return allowed.includes(session.user.role);
}

export function hasUserType(session: Session | null, allowed: UserType[]) {
	if (!session) return false;
	return allowed.includes(session.user.userType);
}

export function isOnboarded(session: Session | null): boolean {
	if (!session) return false;
	return session.user.isOnboarded;
}

// Single value helpers (moved from session.ts to avoid server action conflicts)
export function hasUserTypeValue(session: Session, userType: UserType): boolean {
	return session.user.userType === userType;
}

export function hasRoleValue(session: Session, role: UserRole): boolean {
	return session.user.role === role;
}

export function isUserOnboarded(session: Session): boolean {
	return session.user.isOnboarded;
}

// Session-based redirect logic (moved from session.ts to avoid server action conflicts)
export function getRedirectUrl(session: Session): string {
	if (!session.user.isOnboarded) {
		return "/onboarding";
	}

	const { getDashboardRoute } = require("@/lib/user-types.config");
	return getDashboardRoute(session.user.userType, session.user.role);
}
