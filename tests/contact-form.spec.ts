import { test, expect } from '@playwright/test';

const isProduction = process.env.NODE_ENV === 'production' || process.env.TEST_ENV === 'production';
const baseURL = isProduction ? 'https://skojarzenia.netlify.app' : 'http://localhost:5173';

test.describe(`Contact Form - ${isProduction ? 'Production' : 'Development'} Environment`, () => {
  test.use({
    baseURL: baseURL
  });

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

  test('should have correct form attributes for current environment', async ({ page }) => {
    const form = page.locator('.contact-form');
    
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form).toHaveAttribute('data-netlify', 'true');
    
    if (isProduction) {
      const actionAttr = await form.getAttribute('action');
      expect(actionAttr).toBeNull();
      
      const reloadAttr = await form.getAttribute('data-sveltekit-reload');
      expect(reloadAttr).toBe('true');
    } else {
      await expect(form).toHaveAttribute('action', '/kontakt');
      
      const reloadAttr = await form.getAttribute('data-sveltekit-reload');
      expect(reloadAttr).toBe('false');
    }
  });

  test('should have hidden Netlify form fields', async ({ page }) => {
    await expect(page.locator('input[name="form-name"][value="contact"]')).toBeHidden();
    await expect(page.locator('input[name="bot-field"]')).toBeHidden();
    await expect(page.locator('input[name="_next"][value="/dziekujemy"]')).toBeHidden();
  });

  test('should fill out and submit form successfully', async ({ page }) => {
    await page.fill('.contact-form input[name="name"]', 'Test Wizard');
    await page.fill('.contact-form input[name="email"]', 'test@example.com');
    await page.fill('.contact-form textarea[name="message"]', 'To jest testowa wiadomość z Playwright!');
    
    const submitButton = page.locator('.contact-form button[type="submit"]');
    await submitButton.click();
    
    const urlPattern = isProduction ? '**/dziekujemy' : '/dziekujemy';
    const timeout = isProduction ? 10000 : 5000;
    
    await page.waitForURL(urlPattern, { timeout });
    await expect(page.locator('h1')).toContainText('DZIĘKUJEMY!');
  });

  test('should handle form submission with network monitoring', async ({ page }) => {
    let postRequestMade = false;
    
    page.on('request', request => {
      if (request.method() === 'POST') {
        if (isProduction) {
          if (request.url().includes('netlify.app') || request.url().includes('forms')) {
            postRequestMade = true;
          }
        } else {
          if (request.url().includes('/kontakt')) {
            postRequestMade = true;
          }
        }
      }
    });

    await page.fill('.contact-form input[name="name"]', 'Network Test');
    await page.fill('.contact-form input[name="email"]', 'network@test.com');
    await page.fill('.contact-form textarea[name="message"]', 'Testing network behavior');
    
    await page.locator('.contact-form button[type="submit"]').click();
    
    const urlPattern = isProduction ? '**/dziekujemy' : '/dziekujemy';
    const timeout = isProduction ? 10000 : 5000;
    
    await page.waitForURL(urlPattern, { timeout });
    expect(postRequestMade).toBe(true);
  });

  test('should validate form fields are properly bound', async ({ page }) => {
    const nameInput = page.locator('.contact-form input[name="name"]');
    const emailInput = page.locator('.contact-form input[name="email"]');
    const messageTextarea = page.locator('.contact-form textarea[name="message"]');
    
    await nameInput.fill('Dynamic Test');
    await emailInput.fill('dynamic@test.com');
    await messageTextarea.fill('Testing dynamic binding');
    
    await expect(nameInput).toHaveValue('Dynamic Test');
    await expect(emailInput).toHaveValue('dynamic@test.com');
    await expect(messageTextarea).toHaveValue('Testing dynamic binding');
  });

  test('should handle form validation and behavior correctly', async ({ page }) => {
    await page.fill('.contact-form input[name="name"]', 'Validation Test');
    await page.fill('.contact-form input[name="email"]', 'validation@test.com');
    await page.fill('.contact-form textarea[name="message"]', 'Testing form validation behavior');
    
    const submitButton = page.locator('.contact-form button[type="submit"]');
    await submitButton.click();
    
    const urlPattern = isProduction ? '**/dziekujemy' : '/dziekujemy';
    const timeout = isProduction ? 10000 : 5000;
    
    await page.waitForURL(urlPattern, { timeout });
    await expect(page.locator('h1')).toContainText('DZIĘKUJEMY!');
  });

  test('should handle form behavior after successful submission', async ({ page }) => {
    await page.fill('.contact-form input[name="name"]', 'Clear Test');
    await page.fill('.contact-form input[name="email"]', 'clear@test.com');
    await page.fill('.contact-form textarea[name="message"]', 'This should be cleared');
    
    await page.locator('.contact-form button[type="submit"]').click();
    
    const urlPattern = isProduction ? '**/dziekujemy' : '/dziekujemy';
    const timeout = isProduction ? 10000 : 5000;
    
    await page.waitForURL(urlPattern, { timeout });
    await expect(page.locator('h1')).toContainText('DZIĘKUJEMY!');
    
    await page.goBack();
    
    if (isProduction) {
      await expect(page.locator('.contact-form input[name="name"]')).toHaveValue('');
      await expect(page.locator('.contact-form input[name="email"]')).toHaveValue('');
      await expect(page.locator('.contact-form textarea[name="message"]')).toHaveValue('');
    } else {
      await expect(page.locator('.contact-form input[name="name"]')).toBeVisible();
      await expect(page.locator('.contact-form input[name="email"]')).toBeVisible();
      await expect(page.locator('.contact-form textarea[name="message"]')).toBeVisible();
    }
  });
}); 