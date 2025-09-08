# Frontend Testing Suite

This directory contains comprehensive tests for the JFAN frontend authentication and onboarding system.

## Test Structure

```
src/__tests__/
├── components/          # Component unit tests
│   ├── auth/           # Authentication component tests
│   ├── layouts/        # Layout component tests
│   └── onboarding/     # Onboarding component tests
├── integration/        # Integration tests
│   ├── auth-flow.test.tsx
│   ├── onboarding-flow.test.tsx
│   ├── route-protection.test.tsx
│   └── api-integration.test.ts
├── e2e/               # End-to-end tests
│   └── critical-user-journeys.test.tsx
├── mocks/             # Mock handlers and server setup
│   ├── handlers.ts
│   └── server.ts
├── utils/             # Test utilities and helpers
│   ├── test-utils.tsx
│   └── validation.test.ts
└── README.md
```

## Test Categories

### 1. Component Tests (`components/`)

Unit tests for individual React components focusing on:

- Rendering behavior
- User interactions
- Form validation
- Error handling
- Accessibility compliance

**Key Components Tested:**

- `UserTypeSelection` - User type selection component
- `SimpleLoginForm` - Login form with validation
- `UnifiedRegistrationForm` - Registration form for all user types
- `SimpleVerifyEmailForm` - Email verification component
- `AuthLayout` - Authentication layout wrapper
- `RouteGuard` - Route protection component
- `OnboardingFlow` - Multi-step onboarding process

### 2. Integration Tests (`integration/`)

Tests that verify component interactions and API integration:

- Complete authentication flows
- Onboarding process integration
- Route protection mechanisms
- API error handling
- Session management

**Test Files:**

- `auth-flow.test.tsx` - Complete registration and login flows
- `onboarding-flow.test.tsx` - Multi-step onboarding integration
- `route-protection.test.tsx` - Authentication and authorization
- `api-integration.test.ts` - API endpoint testing

### 3. End-to-End Tests (`e2e/`)

Full user journey tests simulating real user interactions:

- New job seeker registration to job search
- Company registration to job posting
- Returning user login and dashboard access
- Error recovery scenarios
- Accessibility compliance

### 4. Utility Tests (`utils/`)

Tests for utility functions and validation logic:

- Email validation
- Password strength validation
- Form validation helpers
- Authentication utilities

## Running Tests

### All Tests

```bash
npm run test:all
```

### Specific Test Categories

```bash
# Component tests only
npm run test:components

# Integration tests only
npm run test:integration

# End-to-end tests only
npm run test:e2e

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

### Individual Test Files

```bash
# Run specific test file
npm test -- UserTypeSelection.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="validates email"

# Run tests with verbose output
npm test -- --verbose
```

## Test Configuration

### Jest Configuration (`jest.config.js`)

- Uses Next.js Jest configuration
- JSDOM test environment
- Module path mapping for imports
- Coverage collection settings

### Setup Files

- `jest.setup.js` - Global test setup and mocks
- `src/__tests__/utils/test-utils.tsx` - Custom render functions and utilities

### Mock Server (MSW)

- `src/__tests__/mocks/server.ts` - Mock Service Worker setup
- `src/__tests__/mocks/handlers.ts` - API endpoint mocks

## Writing Tests

### Component Test Example

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyComponent } from "@/components/MyComponent";

describe("MyComponent", () => {
	it("renders correctly", () => {
		render(<MyComponent />);
		expect(screen.getByText("Expected Text")).toBeInTheDocument();
	});

	it("handles user interaction", async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(<MyComponent onAction={mockFn} />);

		await user.click(screen.getByRole("button"));
		expect(mockFn).toHaveBeenCalled();
	});
});
```

### Integration Test Example

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("Integration Test", () => {
	it("handles API integration", async () => {
		// Mock API response
		server.use(
			http.post("/api/endpoint", () => {
				return HttpResponse.json({ success: true });
			})
		);

		render(<ComponentWithAPI />);

		// Trigger API call
		await user.click(screen.getByRole("button"));

		// Verify result
		await waitFor(() => {
			expect(screen.getByText("Success")).toBeInTheDocument();
		});
	});
});
```

## Test Guidelines

### Best Practices

1. **Test user behavior, not implementation details**
2. **Use semantic queries** (`getByRole`, `getByLabelText`)
3. **Test accessibility** (ARIA attributes, keyboard navigation)
4. **Mock external dependencies** (APIs, localStorage, etc.)
5. **Write descriptive test names** that explain the expected behavior

### Accessibility Testing

- Use `getByRole` queries when possible
- Test keyboard navigation with `user.tab()` and `user.keyboard()`
- Verify ARIA attributes and labels
- Check focus management

### Error Testing

- Test both success and error scenarios
- Verify error messages are displayed
- Test error recovery mechanisms
- Mock network failures and API errors

### Performance Considerations

- Use `waitFor` for async operations
- Avoid unnecessary `act()` calls
- Clean up after tests (automatic with testing-library)
- Mock heavy operations and external services

## Coverage Requirements

The test suite aims for:

- **Lines**: 85%+
- **Functions**: 85%+
- **Branches**: 80%+
- **Statements**: 85%+

Coverage reports are generated in the `coverage/` directory and can be viewed in the browser at `coverage/lcov-report/index.html`.

## Continuous Integration

Tests are designed to run in CI environments with:

- Deterministic behavior (no flaky tests)
- Proper cleanup and isolation
- Clear error messages and debugging information
- Fast execution times

## Debugging Tests

### Common Issues

1. **Async operations**: Use `waitFor` for async state changes
2. **Missing mocks**: Check console for unmocked API calls
3. **DOM queries**: Use `screen.debug()` to see current DOM state
4. **User events**: Ensure proper `await` usage with userEvent

### Debug Commands

```bash
# Run single test with debug output
npm test -- --testNamePattern="specific test" --verbose

# Run with coverage to see untested code
npm run test:coverage

# Use Node debugger
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Contributing

When adding new features:

1. Write tests for new components
2. Add integration tests for new flows
3. Update E2E tests for critical user journeys
4. Maintain or improve coverage percentages
5. Follow existing test patterns and naming conventions
