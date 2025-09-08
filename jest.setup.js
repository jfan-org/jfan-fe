import '@testing-library/jest-dom'
import { server } from './src/__tests__/mocks/server'

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn(),
    }),
    usePathname: () => '/',
}))

// Mock Next.js cookies
jest.mock('next/headers', () => ({
    cookies: () => ({
        get: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
    }),
}))

// Mock server actions
jest.mock('./actions/auth.action', () => ({
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    verifyEmail: jest.fn(),
    resetPassword: jest.fn(),
    forgotPassword: jest.fn(),
}))