import { validateEmail, validatePassword, validateRequired, validatePasswordMatch } from "@/lib/validation";

describe("Validation Utils", () => {
	describe("validateEmail", () => {
		it("validates correct email formats", () => {
			const validEmails = ["test@example.com", "user.name@domain.co.uk", "user+tag@example.org", "user123@test-domain.com"];

			validEmails.forEach((email) => {
				expect(validateEmail(email)).toBe(true);
			});
		});

		it("rejects invalid email formats", () => {
			const invalidEmails = ["invalid-email", "@example.com", "user@", "user..name@example.com", "user@.com", ""];

			invalidEmails.forEach((email) => {
				expect(validateEmail(email)).toBe(false);
			});
		});
	});

	describe("validatePassword", () => {
		it("validates strong passwords", () => {
			const strongPasswords = ["Password123!", "MySecure@Pass1", "Complex#Password2024"];

			strongPasswords.forEach((password) => {
				const result = validatePassword(password);
				expect(result.isValid).toBe(true);
				expect(result.errors).toHaveLength(0);
			});
		});

		it("rejects weak passwords", () => {
			const weakPasswords = [
				{ password: "123", expectedErrors: ["length", "uppercase", "lowercase", "special"] },
				{ password: "password", expectedErrors: ["uppercase", "number", "special"] },
				{ password: "PASSWORD", expectedErrors: ["lowercase", "number", "special"] },
				{ password: "Password", expectedErrors: ["number", "special"] },
				{ password: "Pass123", expectedErrors: ["length", "special"] },
			];

			weakPasswords.forEach(({ password, expectedErrors }) => {
				const result = validatePassword(password);
				expect(result.isValid).toBe(false);
				expectedErrors.forEach((error) => {
					expect(result.errors).toContain(error);
				});
			});
		});

		it("provides helpful error messages", () => {
			const result = validatePassword("weak");

			expect(result.messages).toContain("Password must be at least 8 characters long");
			expect(result.messages).toContain("Password must contain at least one uppercase letter");
			expect(result.messages).toContain("Password must contain at least one number");
			expect(result.messages).toContain("Password must contain at least one special character");
		});
	});

	describe("validateRequired", () => {
		it("validates non-empty strings", () => {
			expect(validateRequired("test")).toBe(true);
			expect(validateRequired("   test   ")).toBe(true);
		});

		it("rejects empty or whitespace-only strings", () => {
			expect(validateRequired("")).toBe(false);
			expect(validateRequired("   ")).toBe(false);
			expect(validateRequired(null)).toBe(false);
			expect(validateRequired(undefined)).toBe(false);
		});
	});

	describe("validatePasswordMatch", () => {
		it("validates matching passwords", () => {
			expect(validatePasswordMatch("password123", "password123")).toBe(true);
		});

		it("rejects non-matching passwords", () => {
			expect(validatePasswordMatch("password123", "different123")).toBe(false);
			expect(validatePasswordMatch("password123", "")).toBe(false);
		});
	});
});
