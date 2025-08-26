import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/session";

export default async function middleware(req: NextRequest) {
	const session = await getSession();
	
	// If no session, redirect to login
	if (!session || !session.user) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	// If user is not onboarded and trying to access protected routes (not onboarding)
	if (!session.user.isOnboarded && !req.nextUrl.pathname.startsWith("/onboarding")) {
		return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
	}

	// If user is onboarded and trying to access onboarding, redirect to dashboard
	if (session.user.isOnboarded && req.nextUrl.pathname.startsWith("/onboarding")) {
		return NextResponse.redirect(new URL("/redirect-user", req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/profile",
		"/onboarding/:path*",
		"/(dashboard)/:path*",
		"/admin/:path*",
		"/employer/:path*", 
		"/user/:path*",
		"/company/:path*",
		"/talent/:path*",
		"/cyber-agent/:path*",
		"/scout/:path*",
		"/professional/:path*",
		"/mentor/:path*",
		"/philanthropist/:path*"
	],
};
