import { describe, expect, it } from 'vitest';

/**
 * Example unit test for utility functions
 * Unit tests for src/ utilities
 */

describe('Example Utility Tests', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  it('should test mathematical operations', () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(2, 3)).toBe(5);
  });

  it('should test string operations', () => {
    const greeting = (name: string) => `Hello, ${name}!`;
    expect(greeting('World')).toBe('Hello, World!');
  });
});
