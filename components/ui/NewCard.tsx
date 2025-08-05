// components/UI/Card.tsx
"use client";
import React from "react";
import { motion, MotionProps } from "framer-motion";

type CardVariant = "default" | "featured" | "minimal";

interface CardProps extends Omit<MotionProps, "children"> {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
	variant?: CardVariant;
	onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = "", hover = true, variant = "default", onClick, ...motionProps }) => {
	const variants: Record<CardVariant, string> = {
		default: "bg-gray-800 border-gray-700 hover:border-green-400",
		featured: "bg-gray-900 border-gray-700 hover:border-yellow-400",
		minimal: "bg-transparent border-gray-600",
	};

	const hoverProps = hover
		? {
				whileHover: { y: -5, scale: 1.02 },
				whileTap: { scale: 0.98 },
		  }
		: {};

	return (
		<motion.div
			className={`p-6 rounded-xl border transition-all duration-300 ${variants[variant]} ${className} ${
				onClick ? "cursor-pointer" : ""
			}`}
			onClick={onClick}
			{...hoverProps}
			{...motionProps}>
			{children}
		</motion.div>
	);
};

export default Card;
