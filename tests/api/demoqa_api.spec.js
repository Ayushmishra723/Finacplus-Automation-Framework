const { test, expect } = require('@playwright/test');
const config = require('../../config');

/**
 * DemoQA Account API Tests
 * Covers: Create User -> Generate Token -> Get User
 */
test.describe('DemoQA Account API Tests', () => {
    // Generate random username to ensure uniqueness
    const username = `test_user_${Date.now()}`;
    const password = 'Password@123!'; // Needs specific complexity: 1 special, 1 number, 1 upper, 8+ chars
    let userId;
    let token;

    test.beforeAll(async ({ request }) => {
        // Optional: setup code if needed, but we keep flow linear in tests for clarity
    });

    test('1. Create User', async ({ request }) => {
        const response = await request.post(`${config.demoqa.baseUrl}Account/v1/User`, {
            data: {
                userName: username,
                password: password
            }
        });

        // Debug logging on failure
        if (response.status() !== 201) {
            console.log('Create User Failed:', await response.text());
        }

        expect(response.status()).toBe(201);
        const body = await response.json();
        console.log('Created User:', body);

        expect(body).toHaveProperty('userID');
        expect(body).toHaveProperty('username', username);

        userId = body.userID;
    });

    test('2. Generate Token', async ({ request }) => {
        const response = await request.post(`${config.demoqa.baseUrl}Account/v1/GenerateToken`, {
            data: {
                userName: username,
                password: password
            }
        });

        if (response.status() !== 200) {
            console.log('Generate Token Failed:', await response.text());
        }

        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log('Token Response:', body);

        expect(body).toHaveProperty('token');
        expect(body.status).toBe('Success');

        token = body.token;
    });

    test('3. Fetch User Details', async ({ request }) => {
        const response = await request.get(`${config.demoqa.baseUrl}Account/v1/User/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status() !== 200) {
            console.log('Get User Failed:', await response.text());
        }

        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log('Fetched User Details:', body);

        expect(body.userId).toBe(userId);
        expect(body.username).toBe(username);
    });
});
