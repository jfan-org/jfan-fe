"use client";

import React from "react";
import { Session } from "@/actions/session";
import { UserType } from "@/types/auth.types";
import { AdminDashboard } from "./AdminDashboard";
import { CompanyDashboard } from "./CompanyDashboard";
import { TalentDashboard } from "./TalentDashboard";
import { GenericDashboard } from "./GenericDashboard";

interface DashboardRouterProps {
	session: Session;
}

/**
 * Routes to the appropriate dashboard component based on user type
 */
export function DashboardRouter({ session }: DashboardRouterProps) {
	switch (session.user.userType) {
		case UserType.ADMIN:
			return <AdminDashboard session={session} />;

		case UserType.COMPANY:
			return <CompanyDashboard session={session} />;

		case UserType.TALENT:
			return <TalentDashboard session={session} />;

		case UserType.CYBER_AGENT:
		case UserType.SCOUT:
		case UserType.PROFESSIONAL:
		case UserType.MENTOR:
		case UserType.PHILANTHROPIST:
			return <GenericDashboard session={session} />;

		default:
			// Fallback for any unknown user types
			return <GenericDashboard session={session} />;
	}
}
