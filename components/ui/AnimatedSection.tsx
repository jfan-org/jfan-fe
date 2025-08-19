"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedSectionProps {
	children: React.ReactNode;
	className?: string;
	variants?: Variants;
	delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "", variants, delay = 0 }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const defaultVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				delay: delay,
				staggerChildren: 0.1,
			},
		},
	};

	// Return plain div during SSR
	if (!isMounted) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			variants={variants || defaultVariants}
			initial="hidden"
			animate="visible"
			whileInView="visible"
			viewport={{ once: true }}
			className={className}>
			{children}
		</motion.div>
	);
};

export default AnimatedSection;
