const { test, expect } = require('@playwright/test');
const RecipePage = require('../pages/RecipePage');
const { waitForObservation } = require('../utils/recipeUtils');

test('Verify recipe rating and review', async ({ page }) => {
    const recipe = new RecipePage(page);

    await recipe.open();
    await recipe.openRecipe();

    await waitForObservation(page);

    await expect(
        page.getByRole('heading', {
            name: 'Easy Oven Pulled Pork'
        })
    ).toBeVisible();

    await expect(recipe.reviewBox).toBeVisible();

    await recipe.writeReview('Great flavors and easy to follow.');

    await expect(recipe.reviewBox).toHaveValue(
        'Great flavors and easy to follow.'
    );
});