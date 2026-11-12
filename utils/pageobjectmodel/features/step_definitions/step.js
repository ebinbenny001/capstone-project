const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

setDefaultTimeout(30 * 1000);
let browser;
let page;

// Before all scenarios
Given('Enter the username {string} and password {string} and click on the login button',
    async function (username, password) {

        browser = await chromium.launch({
            headless: false
        });

        page = await browser.newPage();

        // Open SauceDemo website
        await page.goto('https://www.saucedemo.com/');

        // Enter username
        await page.locator('#user-name').fill(username);

        // Enter password
        await page.locator('#password').fill(password);

        // Click Login button
        await page.locator('#login-button').click();
    }
);


// Verify dashboard and add product to cart
When('the dashboaed is visible and the product {string} is added to cart',
    async function (productName) {

        // Verify dashboard/product page is visible
        await expect(page.locator('.title')).toHaveText('Products');

        // Find the required product
        const product = page.locator('.inventory_item')
            .filter({ hasText: productName });

        // Click Add to cart button
        await product.locator('button').click();
    }
);


// Open cart and checkout
Then('the cart is visible and click on the checkout button',
    async function () {

        // Click shopping cart
        await page.locator('.shopping_cart_link').click();

        // Verify cart page
        await expect(page.locator('.title')).toHaveText('Your Cart');

        // Click Checkout
        await page.locator('#checkout').click();
    }
);
// Enter shipping details
When('the shipping details are entered and the continue button is pressed',
    async function () {

        // Enter First Name
        await page.locator('#first-name').fill('Sheena');

        // Enter Last Name
        await page.locator('#last-name').fill('Rajan');

        // Enter Postal Code
        await page.locator('#postal-code').fill('695001');

        // Click Continue button
        await page.locator('#continue').click();
    }
);


// Verify product is visible in order summary
Then('the order of the product is visible',
    async function () {

        // Verify Checkout Overview page
        await expect(page.locator('.title'))
            .toHaveText('Checkout: Overview');

        // Verify product is displayed
        await expect(page.locator('.inventory_item_name'))
            .toContainText('Sauce Labs Backpack');
    }
);


// Click Finish button
When('i click on the finish button',
    async function () {

        // Click Finish button
        await page.locator('#finish').click();
    }
);


// Verify order confirmation message
Then('the order confirmation message-Thank you for your order is displayed',
    async function () {

        // Verify confirmation message
        await expect(page.locator('.complete-header'))
            .toHaveText('Thank you for your order!');

        // Close browser
        await browser.close();
    }
);