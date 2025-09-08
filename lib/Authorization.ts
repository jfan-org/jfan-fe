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

// Single value helpers
export function hasUserTypeValue(session: Session, userType: UserType): boolean {
	return session.user.userType === userType;
}

export function hasRoleValue(session: Session, role: UserRole): boolean {
	return session.user.role === role;
}

// Session-based redirect logic
export function getRedirectUrl(session: Session): string {
	const { getDashboardRoute } = require("@/lib/user-types.config");
	return getDashboardRoute(session.user.userType, session.user.role);
}
