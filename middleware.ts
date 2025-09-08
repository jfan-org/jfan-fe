import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/session";

export default async function middleware(req: NextRequest) {
	const session = await getSession();
	
	// If no session, redirect to login
	if (!session || !session.user) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	// If trying to access onboarding, redirect to dashboard (no onboarding needed)
	if (req.nextUrl.pathname.startsWith("/onboarding")) {
		return NextResponse.redirect(new URL("/redirect-user", req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/profile",
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
