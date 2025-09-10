// components/HeroSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Users, Globe } from "lucide-react";
import Button from "../ui/NewButton";
import Image from "next/image"; // Import Next.js Image component

const HeroSection = () => {
	// Local images array - ensure these paths are correct
	const images = [
		{
			url: "/images/afro-enterprenure.jpg",
			alt: "African entrepreneur working",
		},
		{
			url: "/images/athletes-starting-line-stadium.jpg",
			alt: "African athletes at the starting line",
		},
		{
			url: "/images/carpenter-cutting-mdf-board-inside-workshop2.jpg",
			alt: "African carpenter cutting MDF board inside workshop",
		},
		{
			url: "/images/happy-young-african-man-using-laptop-computer.jpg",
			alt: "African learner using laptop",
		},
		{
			url: "/images/group-african-kids-paying-attention-class.jpg",
			alt: "African professionals networking",
		},
		{
			url: "/images/woman-teaching-kids-class.jpg",
			alt: "African professionals networking",
		},
	];

	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
		}, 5000);

		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<section className="relative h-screen max-h-[800px] w-full overflow-hidden">
			{/* Background Image Carousel using Next.js Image */}
			<div className="absolute inset-0 z-0">
				{images.map((image, index) => (
					<motion.div
						key={image.url}
						className={`absolute inset-0 ${index === currentImageIndex ? "z-10" : "z-0"}`}
						initial={{ opacity: 0 }}
						animate={{
							opacity: index === currentImageIndex ? 1 : 0,
						}}
						transition={{ duration: 1 }}>
						<Image
							src={image.url} // Use the correct path for your images
							alt={image.alt}
							fill
							priority={index === 0} // Only prioritize first image
							quality={80}
							className="object-cover"
						/>
						{/* Dark overlay */}
						<div className="absolute inset-0 bg-black/50" />
					</motion.div>
				))}
			</div>

			{/* Content (unchanged from your original) */}
			<div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="max-w-4xl mx-auto px-4">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
						<span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
							WELCOME
						</span>{" "}
						TO JFAN
					</h1>
					<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
						Connecting African talent with global opportunities through our comprehensive professional network
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 md:mb-16 w-full max-w-md sm:max-w-none px-4">
					<Button
						href="/register"
						size="lg"
						className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90">
						Join Now
					</Button>
					<Button href="/about" variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
						Learn More
					</Button>
				</motion.div>

				{/* Stats or Features */}
				<div className="container">
					<div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)] ">
						<motion.div
							className="flex gap-14 flex-none pr-14"
							animate={{ translateX: "-50%" }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}>
							{[
								{
									icon: <Target className="w-8 h-8 text-green-400" />,
									title: "54 Countries",
									description: "Covering all African nations",
								},
								{
									icon: <Users className="w-8 h-8 text-yellow-400" />,
									title: "10,000+ Members",
									description: "Growing professional network",
								},
								{
									icon: <Globe className="w-8 h-8 text-blue-400" />,
									title: "Global Reach",
									description: "Connecting Africa to the world",
								},
							].map((item, index) => (
								<div
									key={index}
									className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700 min-w-[240px] sm:min-w-[280px]">
									<div className="mb-3 sm:mb-4">{item.icon}</div>
									<h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
									<p className="text-gray-300 text-sm sm:text-base">{item.description}</p>
								</div>
							))}

							{/* Repeated images for Animation */}
							{[
								{
									icon: <Target className="w-8 h-8 text-green-400" />,
									title: "54 Countries",
									description: "Covering all African nations",
								},
								{
									icon: <Users className="w-8 h-8 text-yellow-400" />,
									title: "10,000+ Members",
									description: "Growing professional network",
								},
								{
									icon: <Globe className="w-8 h-8 text-blue-400" />,
									title: "Global Reach",
									description: "Connecting Africa to the world",
								},
							].map((item, index) => (
								<div
									key={index}
									className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700 min-w-[240px] sm:min-w-[280px]">
									<div className="mb-3 sm:mb-4">{item.icon}</div>
									<h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
									<p className="text-gray-300 text-sm sm:text-base">{item.description}</p>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</div>

			{/* Image indicator dots */}
			<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentImageIndex(index)}
						className={`w-3 h-3 rounded-full transition-colors ${
							index === currentImageIndex ? "bg-white" : "bg-white/50"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>

			{/* Scrolling indicator */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.8 }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
				<div className="animate-bounce w-6 h-6 border-2 border-white rounded-full"></div>
			</motion.div>
		</section>
	);
};

export default HeroSection;
