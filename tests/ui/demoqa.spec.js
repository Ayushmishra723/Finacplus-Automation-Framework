// @ts-check
const { test, expect } = require('@playwright/test');
const { DemoQAHomePage } = require('../../pages/DemoQAHomePage.js');
const { LoginPage } = require('../../pages/LoginPage.js');
const { ProfilePage } = require('../../pages/ProfilePage.js');

/** Keep browser visible for 3 seconds before closing. */
const stayVisible = () => new Promise((r) => setTimeout(r, 3000));

test.describe('DemoQA', () => {
  test('opens the DemoQA home page', async ({ page }) => {
    const homePage = new DemoQAHomePage(page);
    await homePage.openHome();

    await expect(page).toHaveURL(/demoqa\.com/);
    await stayVisible();
  });

  test('go to login, fill userName and password, click Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLogin();
    await loginPage.fillCredentials('Ayush723', 'Mishra@1234');
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/demoqa\.com\/profile/);

    // Upon successful login, validate username and logout button
    const profilePage = new ProfilePage(page);
    await profilePage.expectUsernameToBe('Ayush723');
    await profilePage.expectLogoutButtonVisible();

    // Click on Book Store button
    await profilePage.clickBookStore();
    await expect(page).toHaveURL(/demoqa\.com\/books/);

    await stayVisible();
  });
});
