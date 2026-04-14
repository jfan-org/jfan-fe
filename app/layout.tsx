import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta-sans",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: {
		default: "JFAN — Jobs for Africa Now",
		template: "%s | JFAN",
	},
	description:
		"JFAN connects African talent with global opportunities through a comprehensive professional network spanning all 54 African nations.",
	keywords: ["jobs", "Africa", "careers", "employment", "professional network", "talent", "recruitment"],
	authors: [{ name: "JFAN" }],
	creator: "JFAN",
	metadataBase: new URL("https://jfan.africa"),
	openGraph: {
		title: "JFAN — Jobs for Africa Now",
		description:
			"Connecting African talent with global opportunities through our comprehensive professional network.",
		url: "https://jfan.africa",
		siteName: "JFAN",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "JFAN — Jobs for Africa Now",
		description:
			"Connecting African talent with global opportunities through our comprehensive professional network.",
	},
	icons: {
		icon: [
			{ url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon_io/favicon.ico" },
		],
		apple: { url: "/favicon_io/apple-touch-icon.png" },
		other: [
			{ rel: "android-chrome-192x192", url: "/favicon_io/android-chrome-192x192.png" },
			{ rel: "android-chrome-512x512", url: "/favicon_io/android-chrome-512x512.png" },
		],
	},
	manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${plusJakartaSans.variable} font-sans antialiased`}>{children}</body>
		</html>
	);
}
