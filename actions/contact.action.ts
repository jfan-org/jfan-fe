"use server";

import { ContactInput } from "@/lib/validation.auth";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/constants";

interface ContactResponse {
	success: boolean;
	message: string;
}

export async function submitContactForm(data: ContactInput): Promise<ContactResponse> {
	try {
		console.log("Server Action - Backend URL:", NEXT_PUBLIC_BACKEND_URL);

		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/contact`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data.name,
				from: data.email, // Backend expects 'from' field
				subject: data.subject,
				message: data.message,
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Contact submission failed:", {
				status: response.status,
				statusText: response.statusText,
				error: errorText,
			});

			return {
				success: false,
				message: "Failed to send message. Please try again later.",
			};
		}

		const result = await response.json();
		console.log("Contact form submission successful:", result);

		return {
			success: true,
			message: "Message sent successfully! We'll get back to you soon.",
		};
	} catch (error) {
		console.error("Contact form submission error:", error);

		return {
			success: false,
			message: "An unexpected error occurred. Please try again.",
		};
	}
}