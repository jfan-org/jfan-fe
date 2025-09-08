"use client";

import React, { ReactNode } from "react";
import { Session } from "@/actions/session";
import { AuthLayout } from "./AuthLayout";
import { DashboardLayout } from "./DashboardLayout";

interface AdaptiveLayoutProps {
	children: ReactNode;
	session: Session | null;
}

/**
 * Single adaptive layout component that renders different layouts based on session state
 * - Shows AuthLayout for unauthenticated users
 * - Shows DashboardLayout for authenticated users with user type-specific navigation
 */
export function AdaptiveLayout({ children, session }: AdaptiveLayoutProps) {
	// If no session, show auth layout
	if (!session) {
		return <AuthLayout>{children}</AuthLayout>;
	}

	// If authenticated, show dashboard layout with user type-specific features
	return <DashboardLayout session={session}>{children}</DashboardLayout>;
}
