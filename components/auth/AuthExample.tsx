/**
 * Example component showing how to use authorization utilities
 * This file demonstrates various authorization patterns and can be used as a reference
 */

import { getSession } from "@/actions/session";
import { UserType } from "@/types/auth.types";
import { RouteGuard, AdminGuard, CompanyGuard, TalentGuard, PermissionGuard, AuthGuard } from "./RouteGuard";

// Server component examples
export async function ServerAuthExamples() {
	const session = await getSession();

	return (
		<div className="space-y-6">
			{/* Basic authentication guard */}
			<AuthGuard>
				<div>This content is only visible to authenticated users</div>
			</AuthGuard>

			{/* Admin-only content */}
			<AdminGuard fallback={<div>Admin access required</div>}>
				<div>Admin-only content here</div>
			</AdminGuard>

			{/* Company/Employer content */}
			<CompanyGuard fallback={<div>Company access required</div>}>
				<div>Company dashboard content</div>
			</CompanyGuard>

			{/* Talent-only content */}
			<TalentGuard fallback={<div>Talent access required</div>}>
				<div>Job seeker content</div>
			</TalentGuard>

			{/* Permission-based content */}
			<PermissionGuard resource="jobs" action="write" fallback={<div>Job management permission required</div>}>
				<div>Job management tools</div>
			</PermissionGuard>

			{/* Multiple user types */}
			<RouteGuard requiredUserTypes={[UserType.COMPANY, UserType.ADMIN]} fallback={<div>Company or Admin access required</div>}>
				<div>Employer tools</div>
			</RouteGuard>

			{/* Content that doesn't require onboarding */}
			<AuthGuard requireOnboarding={false}>
				<div>Available even without onboarding</div>
			</AuthGuard>
		</div>
	);
}

// Client component examples
("use client");

import { useAuthorization, PermissionWrapper, RenderForUserType, RenderWithPermission } from "@/lib/client-authorization";
import { Session } from "@/actions/session";

interface ClientAuthExamplesProps {
	session: Session | null;
}

export function ClientAuthExamples({ session }: ClientAuthExamplesProps) {
	const auth = useAuthorization(session);

	return (
		<div className="space-y-6">
			{/* Basic conditional rendering */}
			{auth.isAuthenticated && <div>Welcome, {auth.user?.name}!</div>}

			{/* Role-based rendering */}
			{auth.isAdmin() && <div>Admin controls</div>}

			{auth.isCompany() && <div>Company dashboard</div>}

			{auth.isTalent() && <div>Job search tools</div>}

			{/* Permission-based rendering */}
			{auth.hasPermission("jobs", "write") && <button>Create Job</button>}

			{auth.canManageUsers() && <button>Manage Users</button>}

			{/* Using wrapper components */}
			<PermissionWrapper session={session} resource="analytics" action="read" fallback={<div>Analytics access required</div>}>
				<div>Analytics dashboard</div>
			</PermissionWrapper>

			<RenderForUserType
				session={session}
				userTypes={[UserType.COMPANY, UserType.ADMIN]}
				fallback={<div>Employer access required</div>}>
				<div>Employer features</div>
			</RenderForUserType>

			<RenderWithPermission session={session} resource="system" action="manage" fallback={<div>System admin required</div>}>
				<div>System settings</div>
			</RenderWithPermission>

			{/* Navigation helpers */}
			<div>
				<a href={auth.getDashboardRoute()}>Go to Dashboard</a>
			</div>

			{auth.needsOnboarding() && <div className="bg-yellow-100 p-4 rounded">Please complete your profile setup</div>}
		</div>
	);
}

// Usage in page components
export async function ExamplePage() {
	const session = await getSession();

	return (
		<div>
			<ServerAuthExamples />
			<ClientAuthExamples session={session} />
		</div>
	);
}
