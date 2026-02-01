/**
 * Configuration for UI and API tests.
 * Set DEMOQA_USERNAME and DEMOQA_PASSWORD after manually creating a user at https://demoqa.com/
 */

try { require('dotenv').config(); } catch (_) {}

module.exports = {
  demoqa: {
    baseUrl: process.env.DEMOQA_BASE_URL || 'https://demoqa.com/',
    booksUrl: process.env.DEMOQA_BASE_URL ? `${process.env.DEMOQA_BASE_URL.replace(/\/$/, '')}/books` : 'https://demoqa.com/books',
    username: process.env.DEMOQA_USERNAME || '',
    password: process.env.DEMOQA_PASSWORD || '',
  },
  reqres: {
    baseUrl: process.env.REQRES_BASE_URL || 'https://reqres.in/api',
    apiKey: process.env.REQRES_API_KEY || '',
  },
};
