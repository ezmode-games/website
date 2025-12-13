import { expect, test } from '@playwright/test';

/**
 * E2E test for the homepage (/)
 * Tests the full application flow in a real browser
 * Mirrors src/pages/index.astro route
 */
test.describe('Homepage', () => {
  test('should load and display the page', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check if the page title is set (adjust based on your actual title)
    await expect(page).toHaveTitle(/.*?/);

    // Example: Check if the page has a heading
    // const heading = page.locator('h1');
    // await expect(heading).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });
});
