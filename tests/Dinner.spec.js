const { test, expect } = require('@playwright/test');
const DinnerPage = require('../pages/DinnerPage');
const { waitForObservation } = require('../utils/dinnerUtils');

test('Verify Dinner page and search', async ({ page }) => {
    const dinner = new DinnerPage(page);

    await dinner.open();

    await expect(dinner.heading).toBeVisible();
    await expect(dinner.searchBar).toBeVisible();

    await dinner.searchRecipe('Chicken');

    await waitForObservation(page);
});