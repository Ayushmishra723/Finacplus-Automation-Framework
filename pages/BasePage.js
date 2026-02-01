/**
 * Base Page Object – common actions for all pages.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} baseUrl
   */
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  /**
   * Navigate to a path (relative to baseUrl).
   * @param {string} path - e.g. '' for home, '/login', '/books'
   * @param {object} options - Playwright goto options (timeout, waitUntil)
   */
  async open(path = '', options = {}) {
    const url = path ? `${this.baseUrl}/${path.replace(/^\//, '')}` : this.baseUrl + '/';
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
      ...options,
    });
  }

  /**
   * Alias for open – go to full URL or path.
   * @param {string} pathOrUrl
   */
  async goto(pathOrUrl) {
    const url = pathOrUrl.startsWith('http') ? pathOrUrl : `${this.baseUrl}/${pathOrUrl.replace(/^\//, '')}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }
}

module.exports = { BasePage };
