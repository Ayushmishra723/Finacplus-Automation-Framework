/**
 * Test: Search for "Learning JavaScript Design Patterns" and validate result.
 */
const { test, expect } = require('@playwright/test');
const { BookStorePage } = require('../../pages/BookStorePage');

test.describe('Book Search Scenario', () => {
    test('Search for book and validate visibility', async ({ page }) => {
        const bookStorePage = new BookStorePage(page);
        const targetBookTitle = 'Learning JavaScript Design Patterns';

        // 1. Navigate to Book Store
        await bookStorePage.openBookStore();

        // 2. Search for the book
        await bookStorePage.searchBook(targetBookTitle);

        // 3. Validate the book is visible
        await bookStorePage.validateBookVisible(targetBookTitle);

        // 4. Extract Title, Author, Publisher
        const bookDetails = await bookStorePage.getBookDetails(targetBookTitle);
        console.log('Book Details:', bookDetails);

        // 5. Print details into a file
        const fs = require('fs');
        const path = require('path');
        const outputFilePath = path.join(__dirname, 'book_details.txt');
        const fileContent = `Title: ${bookDetails.title}\nAuthor: ${bookDetails.author}\nPublisher: ${bookDetails.publisher}\n`;
        fs.writeFileSync(outputFilePath, fileContent);

        // Verify file creation
        expect(fs.existsSync(outputFilePath)).toBeTruthy();
    });
});
