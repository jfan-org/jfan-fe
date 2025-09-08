import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/session";
import { UserType } from "@/types/auth.types";
import { canAccessRoute, hasPermission, needsOnboarding, getRedirectUrl } from "@/lib/authorization";

interface RouteGuardProps {
	children: ReactNode;
	requiredUserTypes?: UserType[];
	requiredPermission?: {
		resource: string;
		action: string;
	};
	requireOnboarding?: boolean;
	fallback?: ReactNode;
}

/**
 * Route guard component that protects content based on user permissions
 */
export async function RouteGuard({ children, requiredUserTypes, requiredPermission, requireOnboarding = true, fallback }: RouteGuardProps) {
	const session = await getSession();

	// Check authentication
	if (!session?.user) {
		redirect("/login");
	}

	// Check onboarding requirement
	if (requireOnboarding && needsOnboarding(session)) {
		redirect("/onboarding");
	}

	// Check user type requirement
	if (requiredUserTypes && !requiredUserTypes.includes(session.user.userType)) {
		if (fallback) {
			return <>{fallback}</>;
		}
		redirect("/unauthorized");
	}

	// Check permission requirement
	if (requiredPermission) {
		const hasRequiredPermission = hasPermission(session.user.userType, requiredPermission.resource, requiredPermission.action);

		if (!hasRequiredPermission) {
			if (fallback) {
				return <>{fallback}</>;
			}
			redirect("/unauthorized");
		}
	}

	return <>{children}</>;
}

/**
 * Admin-only route guard
 */
export async function AdminGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
	return (
		<RouteGuard requiredUserTypes={[UserType.ADMIN]} fallback={fallback}>
			{children}
		</RouteGuard>
	);
}

/**
 * Company/Employer route guard
 */
export async function CompanyGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
	return (
		<RouteGuard requiredUserTypes={[UserType.ADMIN, UserType.COMPANY]} fallback={fallback}>
			{children}
		</RouteGuard>
	);
}

/**
 * Talent route guard
 */
export async function TalentGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
	return (
		<RouteGuard requiredUserTypes={[UserType.ADMIN, UserType.TALENT]} fallback={fallback}>
			{children}
		</RouteGuard>
	);
}

/**
 * Permission-based guard
 */
export async function PermissionGuard({
	children,
	resource,
	action,
	fallback,
}: {
	children: ReactNode;
	resource: string;
	action: string;
	fallback?: ReactNode;
}) {
	return (
		<RouteGuard requiredPermission={{ resource, action }} fallback={fallback}>
			{children}
		</RouteGuard>
	);
}

/**
 * Authenticated user guard (any authenticated user)
 */
export async function AuthGuard({ children, requireOnboarding = true }: { children: ReactNode; requireOnboarding?: boolean }) {
	return <RouteGuard requireOnboarding={requireOnboarding}>{children}</RouteGuard>;
}
