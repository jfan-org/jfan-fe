// components/UI/Button.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
	children: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	href?: string;
	onClick?: () => void;
	className?: string;
	icon?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	size = "md",
	href,
	onClick,
	className = "",
	icon,
	type = "button",
	disabled = false,
	...props
}) => {
	const baseClasses = "font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2";

	const variants: Record<ButtonVariant, string> = {
		primary: "bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:shadow-lg",
		secondary: "border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900",
		ghost: "text-gray-300 hover:text-white hover:bg-gray-800",
	};

	const sizes: Record<ButtonSize, string> = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

	const content = (
		<>
			{icon && <span>{icon}</span>}
			<span>{children}</span>
		</>
	);

	if (href && !disabled) {
		return (
			<Link href={href}>
				<motion.span
					className={`${classes} cursor-pointer inline-flex`}
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.95 }}
					{...props}>
					{content}
				</motion.span>
			</Link>
		);
	}

	return (
		<motion.button
			className={classes}
			onClick={onClick}
			type={type}
			disabled={disabled}
			whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
			whileTap={disabled ? {} : { scale: 0.95 }}
			{...props}>
			{content}
		</motion.button>
	);
};

export default Button;
