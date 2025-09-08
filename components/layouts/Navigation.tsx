"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavigationItem, NavigationSection } from "@/lib/navigation.config";
import {
	Home,
	User,
	Settings,
	Briefcase,
	Users,
	BarChart,
	Search,
	Bookmark,
	FileText,
	Shield,
	Folder,
	CheckCircle,
	Target,
	Network,
	Award,
	BookOpen,
	Library,
	Heart,
	TrendingUp,
	Calendar,
	DollarSign,
	Circle,
} from "lucide-react";

interface NavigationProps {
	items?: NavigationItem[];
	sections?: NavigationSection[];
	collapsed?: boolean;
	onItemClick?: () => void;
	className?: string;
}

// Dynamic icon component
const DynamicIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
	const iconMap: Record<string, React.ComponentType<any>> = {
		Home,
		User,
		Settings,
		Briefcase,
		Users,
		BarChart,
		Search,
		Bookmark,
		FileText,
		Shield,
		Folder,
		CheckCircle,
		Target,
		Network,
		Award,
		BookOpen,
		Library,
		Heart,
		TrendingUp,
		Calendar,
		DollarSign,
	};

	const IconComponent = iconMap[iconName] || Circle;
	return <IconComponent className={className} />;
};

// Navigation item component
const NavigationItemComponent = ({
	item,
	collapsed = false,
	onItemClick,
}: {
	item: NavigationItem;
	collapsed?: boolean;
	onItemClick?: () => void;
}) => {
	const pathname = usePathname();
	const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

	return (
		<Link
			href={item.href}
			onClick={onItemClick}
			className={cn(
				"group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
				isActive ? "bg-gray-700 text-white shadow-sm" : "text-gray-300 hover:bg-gray-700 hover:text-white",
				collapsed ? "justify-center px-2" : ""
			)}
			title={collapsed ? item.name : item.description}>
			<DynamicIcon iconName={item.icon} className="h-5 w-5 flex-shrink-0" />
			{!collapsed && (
				<>
					<span className="ml-3 truncate">{item.name}</span>
					{item.badge && <span className="ml-auto bg-gray-600 text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
				</>
			)}
		</Link>
	);
};

// Navigation section component
const NavigationSectionComponent = ({
	section,
	collapsed = false,
	onItemClick,
}: {
	section: NavigationSection;
	collapsed?: boolean;
	onItemClick?: () => void;
}) => {
	if (collapsed) {
		// In collapsed mode, just render items without section headers
		return (
			<>
				{section.items.map((item) => (
					<NavigationItemComponent key={item.name} item={item} collapsed={collapsed} onItemClick={onItemClick} />
				))}
			</>
		);
	}

	return (
		<div className="space-y-1">
			<h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{section.title}</h3>
			<div className="space-y-1">
				{section.items.map((item) => (
					<NavigationItemComponent key={item.name} item={item} collapsed={collapsed} onItemClick={onItemClick} />
				))}
			</div>
		</div>
	);
};

export function Navigation({ items = [], sections = [], collapsed = false, onItemClick, className }: NavigationProps) {
	return (
		<nav className={cn("space-y-4", className)}>
			{/* Render flat items if provided */}
			{items.length > 0 && (
				<div className="space-y-1">
					{items.map((item) => (
						<NavigationItemComponent
							key={item.name}
							item={item}
							collapsed={collapsed}
							onItemClick={onItemClick}
						/>
					))}
				</div>
			)}

			{/* Render sections if provided */}
			{sections.map((section) => (
				<NavigationSectionComponent key={section.title} section={section} collapsed={collapsed} onItemClick={onItemClick} />
			))}
		</nav>
	);
}
