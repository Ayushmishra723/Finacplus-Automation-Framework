/**
 * Book Store Page – https://demoqa.com/books
 */
const { BasePage } = require('./BasePage.js');
const { expect } = require('@playwright/test');

class BookStorePage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page, 'https://demoqa.com');
    }

    /**
     * Open the Book Store page.
     */
    async openBookStore() {
        await this.open('books');
    }

    /**
     * Search for a book by text.
     * @param {string} text
     */
    async searchBook(text) {
        const searchBox = this.page.locator('#searchBox');
        await searchBox.waitFor({ state: 'visible', timeout: 30000 });
        await searchBox.fill(text);
    }

    /**
     * Validate that a book with the given title is visible in the results.
     * @param {string} title
     */
    async validateBookVisible(title) {
        const bookLink = this.page.getByRole('link', { name: title });
        await expect(bookLink).toBeVisible();
    }

    /**
     * Get book details (Title, Author, Publisher) for a given book title.
     * Assumes the book row is visible.
     * @param {string} title
     * @returns {Promise<{title: string, author: string, publisher: string}>}
     */
    async getBookDetails(title) {
        const bookLink = this.page.getByRole('link', { name: title });
        // Ancestor row - The structure is .rt-tr-group -> .rt-tr -> .rt-td
        const row = this.page.locator('.rt-tr-group', { has: bookLink });

        // Columns: [0]Image, [1]Title, [2]Author, [3]Publisher
        const author = await row.locator('.rt-td').nth(2).innerText();
        const publisher = await row.locator('.rt-td').nth(3).innerText();

        return {
            title: title,
            author: author.trim(),
            publisher: publisher.trim()
        };
    }
}

module.exports = { BookStorePage };
