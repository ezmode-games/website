import { describe, expect, it } from 'vitest';

/**
 * Example utility tests for helper functions
 * Add your actual utility functions and tests here as they're created
 */

describe('String Utilities', () => {
  it('should format game names correctly', () => {
    const formatGameName = (name: string) => name.trim().toLowerCase();
    expect(formatGameName(' Skyrim SE ')).toBe('skyrim se');
    expect(formatGameName('FALLOUT 4')).toBe('fallout 4');
  });

  it('should truncate long strings', () => {
    const truncate = (str: string, max: number) =>
      str.length > max ? `${str.slice(0, max)}...` : str;
    expect(truncate('Short', 10)).toBe('Short');
    expect(truncate('This is a very long string', 10)).toBe('This is a ...');
  });
});

describe('Array Utilities', () => {
  it('should deduplicate arrays', () => {
    const dedupe = <T>(arr: T[]) => [...new Set(arr)];
    expect(dedupe([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(dedupe(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('should chunk arrays', () => {
    const chunk = <T>(arr: T[], size: number): T[][] => {
      const result: T[][] = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    };
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk(['a', 'b', 'c'], 1)).toEqual([['a'], ['b'], ['c']]);
  });
});
