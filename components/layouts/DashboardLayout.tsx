"use client";

import React, { useState } from "react";
import { Session } from "@/actions/session";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardLayoutProps {
	children: React.ReactNode;
	session: Session;
}

export function DashboardLayout({ children, session }: DashboardLayoutProps) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	return (
		<div className="min-h-screen bg-gray-900 flex">
			{/* Sidebar */}
			<DashboardSidebar
				session={session}
				collapsed={sidebarCollapsed}
				onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
			/>

			{/* Main content */}
			<div className="flex-1 flex flex-col">
				{/* Mobile header - hidden on desktop, shows on mobile */}
				<div className="lg:hidden bg-gray-800 border-b border-gray-700 p-4">
					<div className="flex items-center justify-between">
						<h1 className="text-lg font-semibold text-white">JFAN</h1>
						<p className="text-sm text-gray-400 capitalize">{session.user.userType}</p>
					</div>
				</div>

				{/* Page content */}
				<main className="flex-1">
					{children}
				</main>
			</div>
		</div>
	);
}