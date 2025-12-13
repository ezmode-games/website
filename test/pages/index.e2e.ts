import { expect, test } from '@playwright/test';

/**
 * E2E tests for the homepage
 * Tests the full application flow in a real browser
 */
test.describe('Homepage', () => {
  test('should load and display the page title', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveTitle(/EZMode Games/);
  });

  test('should display the header with logo and navigation', async ({ page }) => {
    await page.goto('/');

    const header = page.getByRole('banner');
    await expect(header).toBeVisible();

    // Check navigation links in header
    await expect(header.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /policies/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /account/i })).toBeVisible();
  });

  test('should display about section', async ({ page }) => {
    await page.goto('/');

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toContainText('Building tools for');
    await expect(aboutSection).toContainText('gamers');
  });

  test('should display about section with projects', async ({ page }) => {
    await page.goto('/');

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toContainText('open source');

    // Check for project cards
    const projectLinks = page.getByRole('link', { name: /VIEW ON GITHUB/i });
    await expect(projectLinks.first()).toBeVisible();
  });

  test('should display policies section', async ({ page }) => {
    await page.goto('/');

    const policiesSection = page.locator('#policies');
    await expect(policiesSection).toBeVisible();
    await expect(policiesSection).toContainText('Corporate');
    await expect(policiesSection).toContainText('Anonymous by Default');
  });

  test('should display footer with links', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer links
    await expect(footer.getByRole('link', { name: /GitHub/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Discord/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Contact/i })).toBeVisible();

    // Check copyright
    await expect(footer).toContainText('EZMode Games');
  });

  test('should navigate to sections using anchor links', async ({ page }) => {
    await page.goto('/');

    // Click about link in header
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page.locator('#about')).toBeInViewport();

    // Click policies link
    await page
      .getByRole('link', { name: /policies/i })
      .first()
      .click();
    await expect(page.locator('#policies')).toBeInViewport();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');

    // Check description meta tag
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test('should display projects with GitHub links', async ({ page }) => {
    await page.goto('/');

    const projectLinks = page.getByRole('link', { name: /VIEW ON GITHUB/i });
    const count = await projectLinks.count();

    expect(count).toBeGreaterThan(0);

    // Check first project link has proper href
    const firstLink = projectLinks.first();
    const href = await firstLink.getAttribute('href');
    expect(href).toContain('github.com/ezmode-games');
  });

  test('should have AGPL license mentioned', async ({ page }) => {
    await page.goto('/');

    // Check footer for license link
    const licenseLink = page.getByRole('link', { name: /AGPL/i });
    await expect(licenseLink).toBeVisible();

    // Check policies section for license info
    const policiesSection = page.locator('#policies');
    await expect(policiesSection).toContainText('AGPL-3.0');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that content is still visible
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
});
