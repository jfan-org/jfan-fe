/**
 * User Profile Service
 *
 * Handles user profile management including profile updates,
 * password changes, and avatar uploads.
 */

import { api, ApiError } from "@/lib/api-client";
import { API_ENDPOINTS, UserProfile, UpdateProfileRequest, ChangePasswordRequest, FileUploadResponse } from "@/lib/api-types";

export class UserService {
	/**
	 * Get current user profile
	 */
	static async getProfile(): Promise<UserProfile> {
		try {
			const response = await api.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch profile", 400);
			}

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Profile request failed", 500);
		}
	}

	/**
	 * Update user profile
	 */
	static async updateProfile(profileData: UpdateProfileRequest): Promise<UserProfile> {
		try {
			const response = await api.put<UserProfile>(API_ENDPOINTS.USER.UPDATE_PROFILE, profileData);

			if (!response.success || !response.data) {
				throw new ApiError("Profile update failed", 400);
			}

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Profile update request failed", 500);
		}
	}

	/**
	 * Change user password
	 */
	static async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
		try {
			const response = await api.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, passwordData);

			if (!response.success) {
				throw new ApiError("Password change failed", 400);
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Password change request failed", 500);
		}
	}

	/**
	 * Upload user avatar
	 */
	static async uploadAvatar(file: File): Promise<FileUploadResponse> {
		try {
			const formData = new FormData();
			formData.append("avatar", file);

			const response = await api.upload<FileUploadResponse>(API_ENDPOINTS.USER.UPLOAD_AVATAR, formData);

			if (!response.success || !response.data) {
				throw new ApiError("Avatar upload failed", 400);
			}

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Avatar upload request failed", 500);
		}
	}

	/**
	 * Delete user account
	 */
	static async deleteAccount(): Promise<void> {
		try {
			const response = await api.delete(API_ENDPOINTS.USER.PROFILE);

			if (!response.success) {
				throw new ApiError("Account deletion failed", 400);
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Account deletion request failed", 500);
		}
	}
}

// Export convenience functions
export const userService = {
	getProfile: UserService.getProfile,
	updateProfile: UserService.updateProfile,
	changePassword: UserService.changePassword,
	uploadAvatar: UserService.uploadAvatar,
	deleteAccount: UserService.deleteAccount,
};
