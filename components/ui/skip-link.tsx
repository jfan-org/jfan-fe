"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkipLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			// Make the target focusable if it's not already
			if (!target.hasAttribute("tabindex")) {
				target.setAttribute("tabindex", "-1");
			}
			(target as HTMLElement).focus();
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className={cn(
				"skip-link sr-only-focusable",
				"absolute top-0 left-0 z-50 px-4 py-2 bg-blue-600 text-white font-medium rounded-br-md transform -translate-y-full transition-transform duration-200",
				"focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
				className
			)}>
			{children}
		</a>
	);
}

// Multiple skip links component
interface SkipLinksProps {
	links: Array<{
		href: string;
		label: string;
	}>;
}

export function SkipLinks({ links }: SkipLinksProps) {
	return (
		<div className="sr-only-focusable">
			{links.map((link) => (
				<SkipLink key={link.href} href={link.href}>
					{link.label}
				</SkipLink>
			))}
		</div>
	);
}
