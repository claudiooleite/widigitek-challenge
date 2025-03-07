import { vi } from 'vitest';
import '@testing-library/jest-dom';

// ✅ Mock `IntersectionObserver`
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// ✅ Mock `localStorage`
global.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
};
