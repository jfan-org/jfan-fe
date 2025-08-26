"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from "@/actions/session";
import { getUserTypeNavigation } from "@/lib/user-types.config";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { signOut } from "@/actions/auth.action";

interface DashboardSidebarProps {
	session: Session;
	collapsed?: boolean;
	onToggleCollapse?: () => void;
}

// Dynamic icon component
const DynamicIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
	// Import icons dynamically based on iconName
	const iconMap: Record<string, React.ComponentType<any>> = {
		Home: require("lucide-react").Home,
		User: require("lucide-react").User,
		Settings: require("lucide-react").Settings,
		Briefcase: require("lucide-react").Briefcase,
		Users: require("lucide-react").Users,
		BarChart: require("lucide-react").BarChart,
		Search: require("lucide-react").Search,
		Bookmark: require("lucide-react").Bookmark,
		FileText: require("lucide-react").FileText,
		Shield: require("lucide-react").Shield,
		Folder: require("lucide-react").Folder,
		CheckCircle: require("lucide-react").CheckCircle,
		Target: require("lucide-react").Target,
		Network: require("lucide-react").Network,
		Award: require("lucide-react").Award,
		BookOpen: require("lucide-react").BookOpen,
		Library: require("lucide-react").Library,
		Heart: require("lucide-react").Heart,
		TrendingUp: require("lucide-react").TrendingUp,
	};

	const IconComponent = iconMap[iconName];
	
	if (!IconComponent) {
		// Fallback to a default icon if not found
		const DefaultIcon = require("lucide-react").Circle;
		return <DefaultIcon className={className} />;
	}

	return <IconComponent className={className} />;
};

export function DashboardSidebar({ session, collapsed = false, onToggleCollapse }: DashboardSidebarProps) {
	const pathname = usePathname();
	const navigation = getUserTypeNavigation(session.user.userType);

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<div
			className={cn(
				"bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300",
				collapsed ? "w-16" : "w-64"
			)}>
			{/* Header */}
			<div className="p-4 border-b border-gray-700">
				<div className="flex items-center justify-between">
					{!collapsed && (
						<div>
							<h2 className="text-lg font-semibold text-white">JFAN</h2>
							<p className="text-xs text-gray-400 capitalize">{session.user.userType} Dashboard</p>
						</div>
					)}
					<Button
						variant="ghost"
						size="sm"
						onClick={onToggleCollapse}
						className="text-gray-400 hover:text-white p-1 h-auto">
						{collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
					</Button>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 px-2 py-4 space-y-1">
				{navigation.map((item) => {
					const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
					
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
								isActive
									? "bg-gray-700 text-white"
									: "text-gray-400 hover:bg-gray-700 hover:text-white",
								collapsed ? "justify-center" : ""
							)}>
							<DynamicIcon iconName={item.icon} className="h-5 w-5 flex-shrink-0" />
							{!collapsed && <span className="ml-3">{item.name}</span>}
						</Link>
					);
				})}
			</nav>

			{/* User Profile & Sign Out */}
			<div className="border-t border-gray-700 p-4">
				{!collapsed && (
					<div className="mb-4">
						<p className="text-sm font-medium text-white truncate">{session.user.name}</p>
						<p className="text-xs text-gray-400 truncate">{session.user.email}</p>
					</div>
				)}
				<Button
					variant="ghost"
					size="sm"
					onClick={handleSignOut}
					className={cn(
						"w-full text-gray-400 hover:text-white hover:bg-gray-700",
						collapsed ? "p-2" : "justify-start"
					)}>
					<LogOut className="h-4 w-4" />
					{!collapsed && <span className="ml-2">Sign Out</span>}
				</Button>
			</div>
		</div>
	);
}