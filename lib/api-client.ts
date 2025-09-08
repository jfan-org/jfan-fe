/**
 * Simple API Client for JFAN Frontend
 *
 * This client provides a unified interface for all backend communication
 * with built-in authentication, error handling, and retry logic.
 */

import { getSession } from "@/actions/session";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/v1";

// Types for API responses
export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
	errors?: Record<string, string[]>;
}

export interface ApiError {
	message: string;
	status: number;
	code?: string;
	details?: any;
}

// Request configuration
export interface ApiRequestConfig extends RequestInit {
	timeout?: number;
	retries?: number;
	requireAuth?: boolean;
}

// Default configuration
const DEFAULT_CONFIG: ApiRequestConfig = {
	timeout: 10000, // 10 seconds
	retries: 3,
	requireAuth: true,
	headers: {
		"Content-Type": "application/json",
	},
};

/**
 * Simple API Client Class
 */
class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Make an authenticated API request
	 */
	async request<T = any>(endpoint: string, config: ApiRequestConfig = {}): Promise<ApiResponse<T>> {
		const finalConfig = { ...DEFAULT_CONFIG, ...config };
		const url = `${this.baseUrl}${endpoint}`;

		// Add authentication headers if required
		if (finalConfig.requireAuth) {
			const authHeaders = await this.getAuthHeaders();
			finalConfig.headers = {
				...finalConfig.headers,
				...authHeaders,
			};
		}

		// Implement retry logic
		let lastError: Error | null = null;
		const maxRetries = finalConfig.retries || 0;

		for (let attempt = 0; attempt <= maxRetries; attempt++) {
			try {
				const response = await this.makeRequest(url, finalConfig);
				return await this.handleResponse<T>(response);
			} catch (error) {
				lastError = error as Error;

				// Don't retry on authentication errors or client errors (4xx)
				if (error instanceof ApiError && (error.status === 401 || error.status < 500)) {
					throw error;
				}

				// Don't retry on the last attempt
				if (attempt === maxRetries) {
					break;
				}

				// Wait before retrying (exponential backoff)
				await this.delay(Math.pow(2, attempt) * 1000);
			}
		}

		throw lastError || new Error("Request failed after retries");
	}

	/**
	 * GET request
	 */
	async get<T = any>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { ...config, method: "GET" });
	}

	/**
	 * POST request
	 */
	async post<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			...config,
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	/**
	 * PUT request
	 */
	async put<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			...config,
			method: "PUT",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	/**
	 * PATCH request
	 */
	async patch<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			...config,
			method: "PATCH",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	/**
	 * DELETE request
	 */
	async delete<T = any>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { ...config, method: "DELETE" });
	}

	/**
	 * Upload file (multipart/form-data)
	 */
	async upload<T = any>(endpoint: string, formData: FormData, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
		const uploadConfig = { ...config };
		// Remove Content-Type header to let browser set it with boundary
		if (uploadConfig.headers) {
			const { "Content-Type": _, ...headers } = uploadConfig.headers as Record<string, string>;
			uploadConfig.headers = headers;
		}

		return this.request<T>(endpoint, {
			...uploadConfig,
			method: "POST",
			body: formData,
		});
	}

	/**
	 * Get authentication headers
	 */
	private async getAuthHeaders(): Promise<Record<string, string>> {
		try {
			const session = await getSession();
			if (session?.accessToken) {
				return {
					Authorization: `Bearer ${session.accessToken}`,
				};
			}
		} catch (error) {
			console.warn("Failed to get session for API request:", error);
		}
		return {};
	}

	/**
	 * Make the actual HTTP request with timeout
	 */
	private async makeRequest(url: string, config: ApiRequestConfig): Promise<Response> {
		const { timeout, ...fetchConfig } = config;

		// Create abort controller for timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout || DEFAULT_CONFIG.timeout);

		try {
			const response = await fetch(url, {
				...fetchConfig,
				signal: controller.signal,
			});

			clearTimeout(timeoutId);
			return response;
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof Error && error.name === "AbortError") {
				throw new ApiError("Request timeout", 408);
			}

			throw error;
		}
	}

	/**
	 * Handle API response and convert to standard format
	 */
	private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
		let data: any;

		try {
			const text = await response.text();
			data = text ? JSON.parse(text) : {};
		} catch (error) {
			throw new ApiError("Invalid JSON response", response.status);
		}

		if (!response.ok) {
			const errorMessage = data.message || data.error || `HTTP ${response.status}`;
			throw new ApiError(errorMessage, response.status, data.code, data);
		}

		// Normalize response format
		return {
			success: true,
			data: data.data || data,
			message: data.message,
		};
	}

	/**
	 * Delay utility for retry logic
	 */
	private delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
	constructor(message: string, public status: number, public code?: string, public details?: any) {
		super(message);
		this.name = "ApiError";
	}

	/**
	 * Check if error is a specific HTTP status
	 */
	isStatus(status: number): boolean {
		return this.status === status;
	}

	/**
	 * Check if error is a client error (4xx)
	 */
	isClientError(): boolean {
		return this.status >= 400 && this.status < 500;
	}

	/**
	 * Check if error is a server error (5xx)
	 */
	isServerError(): boolean {
		return this.status >= 500;
	}
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Export the class for custom instances if needed
export { ApiClient };

// Convenience functions for common operations
export const api = {
	get: <T = any>(endpoint: string, config?: ApiRequestConfig) => apiClient.get<T>(endpoint, config),

	post: <T = any>(endpoint: string, data?: any, config?: ApiRequestConfig) => apiClient.post<T>(endpoint, data, config),

	put: <T = any>(endpoint: string, data?: any, config?: ApiRequestConfig) => apiClient.put<T>(endpoint, data, config),

	patch: <T = any>(endpoint: string, data?: any, config?: ApiRequestConfig) => apiClient.patch<T>(endpoint, data, config),

	delete: <T = any>(endpoint: string, config?: ApiRequestConfig) => apiClient.delete<T>(endpoint, config),

	upload: <T = any>(endpoint: string, formData: FormData, config?: ApiRequestConfig) => apiClient.upload<T>(endpoint, formData, config),
};

// Import types for client registration
import { UserType, UserRegistrationData } from "@/types/auth.types";
import { getRegistrationEndpoint } from "@/lib/user-types.config";

// Client-side registration function (runs in browser, not server)
export async function clientRegisterUser(userType: UserType, formData: UserRegistrationData): Promise<ApiResponse> {
    try {
        const endpoint = getRegistrationEndpoint(userType);
        console.log("Client Registration - Full API call:", {
            userType,
            endpoint,
            baseUrl: API_BASE_URL,
            fullUrl: `${API_BASE_URL}${endpoint}`,
        });

        // Use the API client but disable auth requirement for registration
        const result = await apiClient.post(endpoint, formData, { 
            requireAuth: false // Registration doesn't need authentication
        });
        
        console.log("Client Registration - Response:", result);
        return result;
    } catch (error) {
        console.error("Client Registration - Error:", error);
        if (error instanceof ApiError) {
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: false,
            message: "Network error occurred. Please check if the backend server is running.",
        };
    }
}
