/**
 * DemoQA Profile Page – shown after successful login (https://demoqa.com/profile)
 */
const { expect } = require('@playwright/test');
const config = require('../config.js');

class ProfilePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Validate the displayed username (case-insensitive; page may show uppercase).
   * @param {string} username - e.g. 'Ayush723'
   */
  async expectUsernameToBe(username) {
    await expect(this.page.locator('#userName-value')).toContainText(
      new RegExp(username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
      { timeout: 10000 }
    );
  }

  /** Validate the Log out button is visible. */
  async expectLogoutButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Log out' })).toBeVisible();
  }

  /** Go to Book Store page (clicks sidebar link if visible, else navigates by URL). */
  async clickBookStore() {
    const baseUrl = config.demoqa.baseUrl.replace(/\/$/, '');
    const bookStoreLink = this.page.getByRole('link', { name: 'Book Store' });
    const visible = await bookStoreLink.isVisible().catch(() => false);
    if (visible) {
      await bookStoreLink.click();
    } else {
      await this.page.goto(`${baseUrl}/books`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    }
  }
}

module.exports = { ProfilePage };
