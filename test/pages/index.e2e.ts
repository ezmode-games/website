import { expect, test } from '@playwright/test';

/**
 * E2E tests for the homepage
 * Tests the full application flow in a real browser
 */
test.describe('Homepage', () => {
  test('should load and display the page title', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveTitle(/ezmode\.games/i);
  });

  test('should display the hero section with logo', async ({ page }) => {
    await page.goto('/');

    // Check logo and brand name are visible
    await expect(page.getByText('games').first()).toBeVisible();

    // Check hero text
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toContainText('We build');
    await expect(heroHeading).toContainText('tools');
    await expect(heroHeading).toContainText('modders');
  });

  test('should display navigation links', async ({ page }) => {
    await page.goto('/');

    // Check GitHub and Discord links in header area
    await expect(page.getByRole('link', { name: /github/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /discord/i }).first()).toBeVisible();
  });

  test('should display CTD section', async ({ page }) => {
    await page.goto('/');

    const ctdSection = page.locator('#ctd');
    await expect(ctdSection).toBeVisible();
    await expect(ctdSection).toContainText('CTD');
    await expect(ctdSection).toContainText('Crash Reporter');
  });

  test('should display CTD features', async ({ page }) => {
    await page.goto('/');

    const ctdSection = page.locator('#ctd');

    // Check feature cards
    await expect(ctdSection).toContainText('Capture');
    await expect(ctdSection).toContainText('Share');
    await expect(ctdSection).toContainText('Pattern');
  });

  test('should display supported games for CTD', async ({ page }) => {
    await page.goto('/');

    const ctdSection = page.locator('#ctd');

    // Check supported games section header
    await expect(ctdSection).toContainText('Supported Games');

    // Check that at least one game card is rendered (dynamically fetched from status.json)
    const gameCards = ctdSection.locator('[class*="border-4"][class*="p-6"]').filter({
      has: page.locator('.font-ui.uppercase.tracking-wider'),
    });
    await expect(gameCards.first()).toBeVisible();

    // Verify known games from status.json are displayed
    await expect(ctdSection).toContainText('Skyrim');
    await expect(ctdSection).toContainText('Cyberpunk');
  });

  test('should display game status indicators in CTD section', async ({ page }) => {
    await page.goto('/');

    const ctdSection = page.locator('#ctd');

    // Game cards should have status-appropriate styling (green for live, yellow for alpha, grey for coming-soon)
    // At minimum, we expect Skyrim to be live (green border)
    const liveGameCard = ctdSection.locator('[class*="border-ez-green-500"]').filter({
      hasText: 'Skyrim',
    });
    await expect(liveGameCard).toBeVisible();

    // Each game card should have a description
    const gameDescriptions = ctdSection.locator('.font-mono.text-sm.text-ez-grey-400');
    expect(await gameDescriptions.count()).toBeGreaterThan(0);
  });

  test('should display GitHub download links for available games', async ({ page }) => {
    await page.goto('/');

    const ctdSection = page.locator('#ctd');

    // Live games should have GitHub download links
    const downloadLinks = ctdSection.getByRole('link', { name: /Download/i });
    expect(await downloadLinks.count()).toBeGreaterThan(0);

    // Download links should open in new tab
    const firstDownloadLink = downloadLinks.first();
    await expect(firstDownloadLink).toHaveAttribute('target', '_blank');
    await expect(firstDownloadLink).toHaveAttribute('rel', /noopener/);
  });

  test('should display Ferritest section', async ({ page }) => {
    await page.goto('/');

    const ferritestSection = page.locator('#ferritest');
    await expect(ferritestSection).toBeVisible();
    await expect(ferritestSection).toContainText('Ferritest');
    await expect(ferritestSection).toContainText('Memory Stress Test');
  });

  test('should display Ferritest features', async ({ page }) => {
    await page.goto('/');

    const ferritestSection = page.locator('#ferritest');

    // Check feature cards
    await expect(ferritestSection).toContainText('Fast');
    await expect(ferritestSection).toContainText('RAM + VRAM');
    await expect(ferritestSection).toContainText('Scriptable');
  });

  test('should display footer with links', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer links
    await expect(footer.getByRole('link', { name: /GitHub/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Discord/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /How We Operate/i })).toBeVisible();

    // Check AGPL mention
    await expect(footer).toContainText('AGPL-3.0');
  });

  test('should navigate to CTD section using scroll link', async ({ page }) => {
    await page.goto('/');

    // Click scroll indicator
    await page.getByRole('link', { name: /scroll/i }).click();
    await expect(page.locator('#ctd')).toBeInViewport();
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

  test('should have external links open in new tab', async ({ page }) => {
    await page.goto('/');

    // Check GitHub link has target="_blank"
    const githubLink = page.getByRole('link', { name: /github/i }).first();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', /noopener/);
  });

  test('should have AGPL license mentioned', async ({ page }) => {
    await page.goto('/');

    // Check footer for license mention
    const footer = page.locator('footer');
    await expect(footer).toContainText('AGPL-3.0');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that content is still visible
    await expect(page.getByText('games').first()).toBeVisible();
    await expect(page.locator('#ctd')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Policies Page', () => {
  test('should load policies page', async ({ page }) => {
    await page.goto('/policies');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveTitle(/How We Operate/i);
  });

  test('should display core principles', async ({ page }) => {
    await page.goto('/policies');

    await expect(page.getByText("Don't be a dick")).toBeVisible();
    await expect(page.locator('#principles')).toBeVisible();
  });

  test('should display B-Corp section', async ({ page }) => {
    await page.goto('/policies');

    await expect(page.locator('#bcorp')).toBeVisible();
    await expect(page.getByText('B Corporation')).toBeVisible();
  });

  test('should display code commitment', async ({ page }) => {
    await page.goto('/policies');

    await expect(page.locator('#code-commitment')).toBeVisible();
    await expect(page.getByText('donated to the modding community')).toBeVisible();
  });

  test('should display open source section', async ({ page }) => {
    await page.goto('/policies');

    await expect(page.locator('#open-source')).toBeVisible();
    await expect(page.locator('#open-source')).toContainText('AGPL-3.0');
  });

  test('should navigate from footer to policies', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /How We Operate/i }).click();
    await expect(page).toHaveURL(/\/policies/);
  });
});
