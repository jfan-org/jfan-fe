"use client";

import { UserType } from "@/types/auth.types";
import { Session } from "@/actions/session";
import { hasPermission, canAccessRoute, isAdmin, isCompany, isTalent, getDashboardRoute, needsOnboarding } from "./authorization";

/**
 * Client-side authorization hook for React components
 */
export function useAuthorization(session: Session | null) {
	const user = session?.user;

	return {
		// User info
		user,
		isAuthenticated: !!user,
		userType: user?.userType,
		isOnboarded: user?.isOnboarded ?? false,

		// Permission checks
		hasPermission: (resource: string, action: string) => (user ? hasPermission(user.userType, resource, action) : false),

		canAccessRoute: (pathname: string) => (user ? canAccessRoute(user.userType, pathname) : false),

		// Role checks
		isAdmin: () => (user ? isAdmin(user.userType) : false),
		isCompany: () => (user ? isCompany(user.userType) : false),
		isTalent: () => (user ? isTalent(user.userType) : false),

		// User type checks
		isUserType: (userType: UserType) => user?.userType === userType,
		hasAnyUserType: (userTypes: UserType[]) => (user ? userTypes.includes(user.userType) : false),

		// Navigation helpers
		getDashboardRoute: () => (user ? getDashboardRoute(user.userType) : "/login"),
		needsOnboarding: () => needsOnboarding(session),

		// Utility functions
		canManageUsers: () => (user ? hasPermission(user.userType, "users", "write") : false),
		canManageJobs: () => (user ? hasPermission(user.userType, "jobs", "write") : false),
		canViewAnalytics: () => (user ? hasPermission(user.userType, "analytics", "read") : false),
	};
}

/**
 * Client-side route protection utility
 */
export function checkRouteAccess(
	session: Session | null,
	pathname: string
): {
	canAccess: boolean;
	redirectTo?: string;
	reason?: string;
} {
	// Not authenticated
	if (!session?.user) {
		return {
			canAccess: false,
			redirectTo: `/login?returnUrl=${encodeURIComponent(pathname)}`,
			reason: "authentication_required",
		};
	}

	// Needs onboarding
	if (!session.user.isOnboarded && !pathname.startsWith("/onboarding")) {
		return {
			canAccess: false,
			redirectTo: "/onboarding",
			reason: "onboarding_required",
		};
	}

	// Check route access
	if (!canAccessRoute(session.user.userType, pathname)) {
		return {
			canAccess: false,
			redirectTo: "/unauthorized",
			reason: "insufficient_permissions",
		};
	}

	return { canAccess: true };
}

/**
 * Client-side permission checker component
 */
interface PermissionWrapperProps {
	children: React.ReactNode;
	session: Session | null;
	resource?: string;
	action?: string;
	userTypes?: UserType[];
	fallback?: React.ReactNode;
	requireAuth?: boolean;
}

export function PermissionWrapper({ children, session, resource, action, userTypes, fallback = null, requireAuth = true }: PermissionWrapperProps) {
	const auth = useAuthorization(session);

	// Check authentication
	if (requireAuth && !auth.isAuthenticated) {
		return <>{fallback}</>;
	}

	// Check user type
	if (userTypes && !auth.hasAnyUserType(userTypes)) {
		return <>{fallback}</>;
	}

	// Check permission
	if (resource && action && !auth.hasPermission(resource, action)) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}

/**
 * Conditional rendering based on user type
 */
export function RenderForUserType({
	children,
	session,
	userTypes,
	fallback = null,
}: {
	children: React.ReactNode;
	session: Session | null;
	userTypes: UserType[];
	fallback?: React.ReactNode;
}) {
	const auth = useAuthorization(session);

	if (!auth.hasAnyUserType(userTypes)) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}

/**
 * Conditional rendering based on permission
 */
export function RenderWithPermission({
	children,
	session,
	resource,
	action,
	fallback = null,
}: {
	children: React.ReactNode;
	session: Session | null;
	resource: string;
	action: string;
	fallback?: React.ReactNode;
}) {
	const auth = useAuthorization(session);

	if (!auth.hasPermission(resource, action)) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}

/**
 * Navigation guard for client-side routing
 */
export function createNavigationGuard(session: Session | null) {
	return {
		canNavigateTo: (pathname: string) => {
			const { canAccess } = checkRouteAccess(session, pathname);
			return canAccess;
		},

		getRedirectUrl: (pathname: string) => {
			const { canAccess, redirectTo } = checkRouteAccess(session, pathname);
			return canAccess ? pathname : redirectTo;
		},

		requireAuth: () => {
			if (!session?.user) {
				throw new Error("Authentication required");
			}
		},

		requireOnboarding: () => {
			if (needsOnboarding(session)) {
				throw new Error("Onboarding required");
			}
		},

		requirePermission: (resource: string, action: string) => {
			if (!session?.user || !hasPermission(session.user.userType, resource, action)) {
				throw new Error(`Permission required: ${resource}:${action}`);
			}
		},
	};
}
