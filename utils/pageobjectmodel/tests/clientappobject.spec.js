const { test, expect } = require("@playwright/test");
const PoManager = require("../page-objects/pomanager");

test('page object model shopping cart application', async ({ page }) => {
    const pomanager = new PoManager(page);

    // 1. Login
    const login = pomanager.getLogin();
    await login.goto();
    await login.validLogin("standard_user", "secret_sauce");

    // 2. Select product & move to cart
    const dashboard = pomanager.getDashboard();
    await dashboard.selectProduct("Sauce Labs Backpack");
    await dashboard.moveToCart();

    // 3. Checkout via Cart Page Object
    const cart = pomanager.getCart();
    await cart.add2cart();

    // 4. Verification
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
});