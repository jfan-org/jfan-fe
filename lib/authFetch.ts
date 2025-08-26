import { refreshToken } from "@/actions/auth.action";
import { getSession } from "@/actions/session";

export interface FetchOptions extends RequestInit {
	headers?: Record<string, string>;
}

export const authFetch = async (url: string | URL, options: FetchOptions = {}) => {
	const session = await getSession();

	console.log(session, "SESIION from aUTH fetch");
	options.headers = {
		'Content-Type': 'application/json',
		...options.headers,
		Authorization: `Bearer ${session?.accessToken}`,
	};
	let response = await fetch(url, options);
	console.log({
		StaTTTTTTTTTTTTTTTTTTTTUS: response.status,
	});

	if (response.status === 401) {
		if (!session?.refreshToken) {
			// No refresh token, redirect to login
			if (typeof window !== 'undefined') {
				window.location.href = '/login';
			}
			throw new Error("refresh token not found!");
		}

		try {
			const newAccessToken = await refreshToken(session.refreshToken);

			if (newAccessToken) {
				options.headers = {
					'Content-Type': 'application/json',
					...options.headers,
					Authorization: `Bearer ${newAccessToken}`,
				};
				response = await fetch(url, options);
			}
		} catch (error) {
			// Refresh failed, redirect to login
			console.error("Token refresh failed:", error);
			if (typeof window !== 'undefined') {
				window.location.href = '/login';
			}
			throw error;
		}
	}
	return response;
};
