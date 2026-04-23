"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, User, MessageSquare, Building2, Users, Globe, Clock, CheckCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { contactSchema, ContactInput } from "@/lib/validation.auth";
import { submitContactForm } from "@/actions/contact.action";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);

	const form = useForm<ContactInput>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (data: ContactInput) => {
		try {
			setIsSubmitting(true);
			setSubmitMessage(null);

			const result = await submitContactForm(data);

			if (result.success) {
				setSubmitMessage({
					type: "success",
					message: "Thank you for your message! We&apos;ll get back to you within 24 hours.",
				});
				form.reset();
			} else {
				setSubmitMessage({
					type: "error",
					message: result.message || "Failed to send message. Please try again.",
				});
			}
		} catch (error) {
			console.error("Contact form error:", error);
			setSubmitMessage({
				type: "error",
				message: "An unexpected error occurred. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-900">
			<Header />

			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden bg-gray-800">
				{/* Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-3xl" />
					<div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-400/10 to-transparent rounded-full blur-3xl" />
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}>
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl mb-6">
								<Mail className="w-8 h-8 text-gray-900" />
							</div>
							<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
								Get in{" "}
								<span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
									Touch
								</span>
							</h1>
							<p className="text-xl text-gray-300 max-w-3xl mx-auto">
								Have questions about JFAN? Need support? Want to partner with us? We&apos;d love to
								hear from you and help you connect with Africa&apos;s talent ecosystem.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16 bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}>
							<Card className="border border-gray-700 shadow-2xl bg-gray-800/80 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-2xl font-bold text-white flex items-center">
										<MessageSquare className="w-6 h-6 mr-3 text-green-400" />
										Send us a Message
									</CardTitle>
									<CardDescription className="text-gray-300">
										Fill out the form below and we&apos;ll get back to you as soon as
										possible.
									</CardDescription>
								</CardHeader>

								<CardContent>
									{submitMessage && (
										<Alert
											className={`mb-6 ${
												submitMessage.type === "success"
													? "border-green-500 bg-green-900/50"
													: "border-red-500 bg-red-900/50"
											}`}>
											{submitMessage.type === "success" ? (
												<CheckCircle className="h-4 w-4 text-green-600" />
											) : (
												<Mail className="h-4 w-4 text-red-600" />
											)}
											<AlertDescription
												className={
													submitMessage.type === "success"
														? "text-green-700"
														: "text-red-700"
												}>
												{submitMessage.message}
											</AlertDescription>
										</Alert>
									)}

									<Form {...form}>
										<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
											<div className="grid md:grid-cols-2 gap-6">
												<FormField
													control={form.control}
													name="name"
													render={({ field }) => (
														<FormItem>
															<FormLabel className="text-gray-300 font-medium">
																Full Name
															</FormLabel>
															<FormControl>
																<div className="relative">
																	<User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
																	<Input
																		{...field}
																		placeholder="John Doe"
																		className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
																	/>
																</div>
															</FormControl>
															<FormMessage className="text-red-500" />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="email"
													render={({ field }) => (
														<FormItem>
															<FormLabel className="text-gray-300 font-medium">
																Email Address
															</FormLabel>
															<FormControl>
																<div className="relative">
																	<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
																	<Input
																		{...field}
																		type="email"
																		placeholder="john@example.com"
																		className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
																	/>
																</div>
															</FormControl>
															<FormMessage className="text-red-500" />
														</FormItem>
													)}
												/>
											</div>

											<FormField
												control={form.control}
												name="subject"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-gray-300 font-medium">
															Subject
														</FormLabel>
														<FormControl>
															<div className="relative">
																<MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
																<Input
																	{...field}
																	placeholder="How can we help you?"
																	className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
																/>
															</div>
														</FormControl>
														<FormMessage className="text-red-500" />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="message"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-gray-300 font-medium">
															Message
														</FormLabel>
														<FormControl>
															<Textarea
																{...field}
																placeholder="Tell us more about your inquiry..."
																rows={6}
																className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 resize-none"
															/>
														</FormControl>
														<FormMessage className="text-red-500" />
													</FormItem>
												)}
											/>

											<Button
												type="submit"
												disabled={isSubmitting}
												className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-gray-900 font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50">
												{isSubmitting ? (
													<>
														<Loader2 className="w-4 h-4 mr-2 animate-spin" />
														Sending Message...
													</>
												) : (
													<>
														<Send className="w-4 h-4 mr-2" />
														Send Message
													</>
												)}
											</Button>
										</form>
									</Form>
								</CardContent>
							</Card>
						</motion.div>

						{/* Contact Information */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="space-y-8">
							{/* Contact Details */}
							<div>
								<h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
								<div className="space-y-6">
									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-400 rounded-xl flex items-center justify-center">
											<Mail className="w-5 h-5 text-gray-900" />
										</div>
										<div>
											<h4 className="font-semibold text-white">Email Us</h4>
											<p className="text-gray-300">contact@jfan.tech</p>
											<p className="text-sm text-gray-400 mt-1">
												We typically respond within 24 hours
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-400 rounded-xl flex items-center justify-center">
											<MapPin className="w-5 h-5 text-gray-900" />
										</div>
										<div>
											<h4 className="font-semibold text-white">Headquarters</h4>
											<p className="text-gray-300">Abuja FCT, Nigeria</p>
											<p className="text-sm text-gray-400 mt-1">
												Serving all of Africa
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-400 rounded-xl flex items-center justify-center">
											<Clock className="w-5 h-5 text-gray-900" />
										</div>
										<div>
											<h4 className="font-semibold text-white">Business Hours</h4>
											<p className="text-gray-300">
												Monday - Friday: 9:00 AM - 6:00 PM (EAT)
											</p>
											<p className="text-sm text-gray-400 mt-1">
												Emergency support available 24/7
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Support Categories */}
							<div>
								<h3 className="text-2xl font-bold text-white mb-6">How Can We Help?</h3>
								<div className="grid gap-4">
									{[
										{
											icon: Users,
											title: "General Inquiries",
											description:
												"Questions about JFAN, our mission, and services",
										},
										{
											icon: Building2,
											title: "Partnership Opportunities",
											description:
												"Collaborate with us to grow Africa&apos;s talent ecosystem",
										},
										{
											icon: Globe,
											title: "Technical Support",
											description:
												"Need help with your account or technical issues?",
										},
									].map((item, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
											className="p-4 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 transition-colors">
											<div className="flex items-start space-x-3">
												<div className="flex-shrink-0">
													<item.icon className="w-5 h-5 text-green-400 mt-0.5" />
												</div>
												<div>
													<h4 className="font-semibold text-white">
														{item.title}
													</h4>
													<p className="text-sm text-gray-300 mt-1">
														{item.description}
													</p>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
