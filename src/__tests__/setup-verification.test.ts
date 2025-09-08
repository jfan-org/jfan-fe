/**
 * Basic test to verify Jest setup is working correctly
 */

describe("Test Setup Verification", () => {
	it("should run basic assertions", () => {
		expect(true).toBe(true);
		expect(1 + 1).toBe(2);
		expect("hello").toMatch(/hello/);
	});

	it("should have access to Jest globals", () => {
		expect(jest).toBeDefined();
		expect(describe).toBeDefined();
		expect(it).toBeDefined();
		expect(expect).toBeDefined();
	});

	it("should support async/await", async () => {
		const promise = Promise.resolve("test");
		const result = await promise;
		expect(result).toBe("test");
	});

	it("should support mocking", () => {
		const mockFn = jest.fn();
		mockFn("test");

		expect(mockFn).toHaveBeenCalledWith("test");
		expect(mockFn).toHaveBeenCalledTimes(1);
	});
});
