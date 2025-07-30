"use client";
// import ArrowRight from "@/assets/arrow-right.svg";
// import cogImage from "./images/logo.jpg";
// import noodleImage from "./images/heroImageJfan.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
	const heroRef = useRef(null);
	const { scrollXProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
	const traslateY = useTransform(scrollXProgress, [0, 1], [150, -150]);
	return (
		<section
			ref={heroRef}
			className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#389048,#EAEEFE_100%)] overflow-x-clip">
			<div className="center-width">
				<div className="md:flex items-center">
					<div className="md:w-[478px]">
						<div className="tag">Version 2.0 is here</div>
						<h1 className="heading1">Africa's Number One Job Platform</h1>
						<p className="section-description ">
							{" "}
							Connect with leading employers from Cape Town to Cairo. Find jobs that match your skills,
							aspirations, and cultural values across the African continent.
						</p>
						<div className="flex gap-1 items-center mt-[30px]">
							<button className="btn btn-primary">Get for free</button>
							<button className="btn btn-text">
								<span>Learn more</span>
								<ArrowRight className="h-5 w-5" />
							</button>
						</div>
					</div>
					<div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
						<motion.img
							animate={{
								translateY: [-30, 30],
								transition: {
									repeat: Infinity,
									repeatType: "mirror",
									duration: 4,
									ease: "easeInOut",
								},
							}}
							src={"/images/3dfric-map.png"}
							alt="cog image"
							className=" md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
						/>
						<motion.img
							src={"/images/location.png"}
							style={{ translateY: traslateY }}
							alt="cylinder  image"
							width={220}
							height={220}
							className=" hidden md:block -top-8 -left-32 md:absolute"
						/>
						<motion.img
							src={"/images/3dfric-map.png"}
							style={{ translateY: traslateY, rotate: 30 }}
							alt="noodle  image"
							width={220}
							height={220}
							className=" hidden lg:block top-[524px] left-[448px] absolute rotate-[30deg]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
