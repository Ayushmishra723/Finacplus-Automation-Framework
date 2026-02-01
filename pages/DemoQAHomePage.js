/**
 * DemoQA Home Page – https://demoqa.com/
 */
const { BasePage } = require('./BasePage.js');
const config = require('../config.js');

class DemoQAHomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page, config.demoqa.baseUrl);
  }

  /**
   * Open the DemoQA home page.
   */
  async openHome() {
    await this.open('');
  }
}

module.exports = { DemoQAHomePage };
