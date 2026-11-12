const { test, expect } = require('@playwright/test');
const IngredientsPage = require('../pages/IngredientsPage');
const { waitForObservation } = require('../utils/ingredientsUtils');

test('Verify Ingredients A-Z page', async ({ page }) => {
    const ingredients = new IngredientsPage(page);

    await ingredients.open();

    await expect(ingredients.heading).toBeVisible();
    await expect(ingredients.searchBar).toBeVisible();

    await ingredients.clickLetterA();

    await expect(page.getByText('Almond Meal', { exact: true })).toBeVisible();
    await expect(page.getByText('Almonds', { exact: true })).toBeVisible();

    await waitForObservation(page);
});                                                                                               