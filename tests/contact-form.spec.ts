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

  });

  test('should have required form fields', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('should fill out form fields correctly', async ({ page }) => {
    await page.fill('.contact-form input[name="name"]', 'Test User');
    await page.fill('.contact-form input[name="email"]', 'test@example.com');
    await page.fill('.contact-form textarea[name="message"]', 'This is a test message');
    
    await expect(page.locator('.contact-form input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('.contact-form input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('.contact-form textarea[name="message"]')).toHaveValue('This is a test message');
  });

  test('should have correct form configuration for Netlify', async ({ page }) => {
    const form = page.locator('.contact-form');
    await expect(form).toHaveAttribute('action', '/dziekujemy');
    await expect(form).toHaveAttribute('data-sveltekit-reload');
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form).toHaveAttribute('name', 'contact');
  });

  test('should have submit button', async ({ page }) => {
    const submitBtn = page.locator('.contact-form button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('WYŚLIJ WIADOMOŚĆ');
  });

  test('thank you page should be accessible and have correct content', async ({ page }) => {
    await page.goto('/dziekujemy');
    await expect(page.locator('h1')).toContainText('DZIĘKUJEMY!');
    await expect(page.locator('.thank-you-message')).toContainText('Twoja wiadomość została pomyślnie wysłana');
    await expect(page.locator('.back-home-btn')).toBeVisible();
  });
}); 