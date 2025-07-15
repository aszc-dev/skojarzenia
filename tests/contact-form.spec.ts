import { test, expect } from '@playwright/test';

test.describe('Contact Form - Netlify Forms', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/kontakt');
  });

  test('should display contact form with all fields', async ({ page }) => {
    await expect(page.locator('h2:has-text("NAPISZ DO NAS")')).toBeVisible();
    await expect(page.locator('.contact-form input[name="name"]')).toBeVisible();
    await expect(page.locator('.contact-form input[name="email"]')).toBeVisible();
    await expect(page.locator('.contact-form textarea[name="message"]')).toBeVisible();
    await expect(page.locator('.contact-form button[type="submit"]')).toBeVisible();
  });

  test('should have correct form attributes for Netlify Forms', async ({ page }) => {
    const form = page.locator('.contact-form');
    
    await expect(form).toHaveAttribute('name', 'contact');
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form).toHaveAttribute('action', '/dziekujemy');
    await expect(form).toHaveAttribute('data-netlify', 'true');
    await expect(form).toHaveAttribute('data-sveltekit-reload', 'false');
  });

  test('should have hidden Netlify form fields', async ({ page }) => {
    await expect(page.locator('input[name="form-name"][value="contact"]')).toBeHidden();
    await expect(page.locator('input[name="bot-field"]')).toBeHidden();
  });

  test('should fill out form fields correctly', async ({ page }) => {
    await page.fill('.contact-form input[name="name"]', 'Test User');
    await page.fill('.contact-form input[name="email"]', 'test@example.com');
    await page.fill('.contact-form textarea[name="message"]', 'This is a test message');
    
    await expect(page.locator('.contact-form input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('.contact-form input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('.contact-form textarea[name="message"]')).toHaveValue('This is a test message');
  });

  test('should handle form submission and redirect', async ({ page }) => {
    await page.fill('.contact-form input[name="name"]', 'Submission Test');
    await page.fill('.contact-form input[name="email"]', 'submission@test.com');
    await page.fill('.contact-form textarea[name="message"]', 'Testing successful form submission');
    
    await page.locator('.contact-form button[type="submit"]').click();
    
    await page.waitForURL('**/dziekujemy', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('DZIĘKUJEMY!');
  });
}); 