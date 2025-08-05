// // components/layout/Footer.tsx
// import React from "react";
// import Link from "next/link";
// import { MapPin, Mail, Phone, Globe, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

// const Footer: React.FC = () => {
// 	const currentYear = new Date().getFullYear();

// 	const footerSections = [
// 		{
// 			title: "For Job Seekers",
// 			links: [
// 				{ name: "Browse Jobs", href: "/jobs" },
// 				{ name: "Career Advice", href: "/career-advice" },
// 				{ name: "Salary Guide", href: "/salary-guide" },
// 				{ name: "Resume Builder", href: "/resume-builder" },
// 				{ name: "Interview Prep", href: "/interview-prep" },
// 			],
// 		},
// 		{
// 			title: "For Employers",
// 			links: [
// 				{ name: "Post Jobs", href: "/post-job" },
// 				{ name: "Find Talent", href: "/talent-search" },
// 				{ name: "Pricing Plans", href: "/pricing" },
// 				{ name: "Success Stories", href: "/success-stories" },
// 				{ name: "Employer Resources", href: "/employer-resources" },
// 			],
// 		},
// 		{
// 			title: "Company",
// 			links: [
// 				{ name: "About Us", href: "/about" },
// 				{ name: "Our Mission", href: "/mission" },
// 				{ name: "Contact", href: "/contact" },
// 				{ name: "Newsroom", href: "/news" },
// 				{ name: "Careers", href: "/careers" },
// 			],
// 		},
// 		{
// 			title: "Support",
// 			links: [
// 				{ name: "Help Center", href: "/help" },
// 				{ name: "Privacy Policy", href: "/privacy" },
// 				{ name: "Terms of Service", href: "/terms" },
// 				{ name: "Cookie Policy", href: "/cookies" },
// 				{ name: "Accessibility", href: "/accessibility" },
// 			],
// 		},
// 	];

// 	const socialLinks = [
// 		{ name: "Facebook", icon: Facebook, href: "#" },
// 		{ name: "Twitter", icon: Twitter, href: "#" },
// 		{ name: "LinkedIn", icon: Linkedin, href: "#" },
// 		{ name: "Instagram", icon: Instagram, href: "#" },
// 	];

// 	const countries = [
// 		"Nigeria",
// 		"Kenya",
// 		"South Africa",
// 		"Ghana",
// 		"Egypt",
// 		"Morocco",
// 		"Ethiopia",
// 		"Uganda",
// 		"Tanzania",
// 		"Rwanda",
// 		"Botswana",
// 		"Senegal",
// 	];

// 	return (
// 		<footer className="bg-gray-900 text-white">
// 			{/* Newsletter Section */}
// 			<div className="border-b border-gray-800">
// 				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// 					<div className="max-w-4xl mx-auto text-center">
// 						<h3 className="text-2xl font-bold mb-4">Stay Updated with African Job Atlas</h3>
// 						<p className="text-gray-400 mb-8 max-w-2xl mx-auto">
// 							Get the latest job opportunities, career insights, and industry trends delivered to your inbox
// 							weekly.
// 						</p>
// 						<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
// 							<input
// 								type="email"
// 								placeholder="Enter your email address"
// 								className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
// 							/>
// 							<button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
// 								Subscribe
// 							</button>
// 						</div>
// 						<p className="text-xs text-gray-500 mt-4">Join 50,000+ professionals already subscribed</p>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Main Footer Content */}
// 			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// 				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
// 					{/* Brand Section */}
// 					<div className="lg:col-span-2">
// 						<Link href="/" className="flex items-center space-x-3 mb-6">
// 							<div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-xl flex items-center justify-center">
// 								<MapPin className="w-6 h-6 text-white" />
// 							</div>
// 							<div>
// 								<h2 className="text-xl font-bold">African Job Atlas</h2>
// 								<p className="text-sm text-gray-400">Connecting Africa's Talent</p>
// 							</div>
// 						</Link>

// 						<p className="text-gray-400 mb-6 leading-relaxed">
// 							Empowering careers and connecting opportunities across the African continent. Join the largest
// 							professional network dedicated to African talent.
// 						</p>

// 						{/* Contact Info */}
// 						<div className="space-y-3 mb-6">
// 							<div className="flex items-center space-x-3 text-sm text-gray-400">
// 								<Mail className="w-4 h-4" />
// 								<span>hello@africanjobatlas.com</span>
// 							</div>
// 							<div className="flex items-center space-x-3 text-sm text-gray-400">
// 								<Phone className="w-4 h-4" />
// 								<span>+234 800 123 4567</span>
// 							</div>
// 							<div className="flex items-center space-x-3 text-sm text-gray-400">
// 								<Globe className="w-4 h-4" />
// 								<span>Serving all 54 African countries</span>
// 							</div>
// 						</div>

// 						{/* Social Links */}
// 						<div className="flex space-x-4">
// 							{socialLinks.map((social) => {
// 								const Icon = social.icon;
// 								return (
// 									<a
// 										key={social.name}
// 										href={social.href}
// 										className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-amber-400 transition-all duration-200"
// 										aria-label={social.name}>
// 										<Icon className="w-5 h-5" />
// 									</a>
// 								);
// 							})}
// 						</div>
// 					</div>

// 					{/* Footer Links */}
// 					{footerSections.map((section) => (
// 						<div key={section.title}>
// 							<h4 className="font-semibold mb-6 text-white">{section.title}</h4>
// 							<ul className="space-y-3">
// 								{section.links.map((link) => (
// 									<li key={link.name}>
// 										<Link
// 											href={link.href}
// 											className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
// 											{link.name}
// 										</Link>
// 									</li>
// 								))}
// 							</ul>
// 						</div>
// 					))}
// 				</div>

// 				{/* Countries Section */}
// 				<div className="mt-16 pt-8 border-t border-gray-800">
// 					<h4 className="font-semibold mb-6 text-center text-white">Available in These Countries</h4>
// 					<div className="flex flex-wrap justify-center gap-4">
// 						{countries.map((country, index) => (
// 							<Link
// 								key={country}
// 								href={`/jobs?country=${country.toLowerCase()}`}
// 								className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-full hover:border-emerald-500 transition-all duration-200">
// 								{country}
// 							</Link>
// 						))}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Bottom Bar */}
// 			<div className="border-t border-gray-800">
// 				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// 					<div className="flex flex-col md:flex-row justify-between items-center">
// 						<div className="text-gray-400 text-sm mb-4 md:mb-0">
// 							© {currentYear} African Job Atlas. All rights reserved. Empowering careers across Africa.
// 						</div>
// 						<div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
// 							<Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
// 								Privacy
// 							</Link>
// 							<Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
// 								Terms
// 							</Link>
// 							<Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
// 								Cookies
// 							</Link>
// 							<Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
// 								Accessibility
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</footer>
// 	);
// };

// export default Footer;

// components/Layout/Footer.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, Globe, ChevronRight } from "lucide-react";
import { FooterSection } from "../../types";

const Footer: React.FC = () => {
	const footerSections: FooterSection[] = [
		{
			title: "Quick Links",
			links: [
				{ name: "About JFAN", href: "/about" },
				{ name: "Our Mission", href: "/about#mission" },
				{ name: "Regional Structure", href: "/regions" },
				{ name: "Communities", href: "/communities" },
				{ name: "Job Atlas", href: "/jobs" },
			],
		},
		{
			title: "Services",
			links: [
				{ name: "Job Matching", href: "/services/job-matching" },
				{ name: "Skills Development", href: "/services/skills" },
				{ name: "Professional Networking", href: "/services/networking" },
				{ name: "Career Guidance", href: "/services/guidance" },
				{ name: "Mentorship", href: "/services/mentorship" },
			],
		},
		{
			title: "Support",
			links: [
				{ name: "Help Center", href: "/help" },
				{ name: "Contact Us", href: "/contact" },
				{ name: "Community Guidelines", href: "/guidelines" },
				{ name: "Privacy Policy", href: "/privacy" },
				{ name: "Terms of Service", href: "/terms" },
			],
		},
	];

	const socialIcons = [Mail, Phone, Globe];

	return (
		<footer className="bg-gray-900 border-t border-gray-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid md:grid-cols-4 gap-8">
					<div>
						<Link href="/">
							<div className="flex items-center space-x-3 mb-4 cursor-pointer">
								<div className="w-10 h-10 bg-gradient-to-br from-green-400 to-yellow-500 rounded-lg flex items-center justify-center font-bold text-gray-900">
									JF
								</div>
								<span className="text-xl font-bold bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
									JFAN
								</span>
							</div>
						</Link>
						<p className="text-gray-400 mb-4">
							Connecting Africa's talent with global opportunities through innovation and collaboration.
						</p>
						<div className="flex space-x-4">
							{socialIcons.map((Icon, index) => (
								<motion.button
									key={index}
									className="w-10 h-10 bg-gray-800 text-gray-400 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}>
									<Icon className="w-5 h-5" />
								</motion.button>
							))}
						</div>
					</div>

					{footerSections.map((section: FooterSection, index: number) => (
						<div key={index}>
							<h3 className="text-lg font-semibold mb-4 text-green-400">{section.title}</h3>
							<ul className="space-y-2">
								{section.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<Link href={link.href}>
											<motion.span
												className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 cursor-pointer"
												whileHover={{ x: 5 }}>
												<ChevronRight className="w-4 h-4" />
												<span>{link.name}</span>
											</motion.span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-400">© 2024 Job-seekers and Freelancers Africa Network. All rights reserved.</p>
					<div className="flex items-center space-x-4 mt-4 md:mt-0">
						<span className="text-gray-400">Powered by:</span>
						<div className="flex items-center space-x-2">
							<span className="text-green-400 font-semibold">Next.js</span>
							<span className="text-gray-600">•</span>
							<span className="text-yellow-400 font-semibold">Nest.js</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
