/**
 * DemoQA Login Page – https://demoqa.com/login
 */
const { BasePage } = require('./BasePage.js');
const config = require('../config.js');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page, config.demoqa.baseUrl);
  }

  /** Open the login page. */
  async openLogin() {
    await this.open('login');
  }

  /**
   * Fill username and password.
   * @param {string} username
   * @param {string} password
   */
  async fillCredentials(username, password) {
    await this.page.locator('#userName').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator('#userName').fill(username);
    await this.page.locator('#password').fill(password);
  }

  /** Click the Login button. */
  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  /**
   * Open login page, fill credentials, and click Login.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.openLogin();
    await this.fillCredentials(username, password);
    await this.clickLogin();
  }
}

module.exports = { LoginPage };
