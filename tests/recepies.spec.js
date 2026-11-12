const { test, expect } = require("@playwright/test");
const RecipesPage = require("../pageobjects/recipes");
const { waitForObservation } = require("../utils/recipesUtils.js");

test("Verify Allrecipes homepage", async ({ page }) => {
    const recipes = new RecipesPage(page);

    await recipes.openWebsite();

    await expect(page).toHaveTitle(/Allrecipes/i);

    await waitForObservation(page);
});

test("Search for a recipe", async ({ page }) => {
    const recipes = new RecipesPage(page);

    await recipes.openWebsite();

    await recipes.searchRecipe("chicken");

    await expect(page).toHaveURL(/search/i);

    await waitForObservation(page);
});

test("Open a recipe", async ({ page }) => {
    const recipes = new RecipesPage(page);

    await recipes.openWebsite();

    await recipes.searchRecipe("chicken");

    await recipes.openFirstRecipe();

    await expect(page.locator("h1").first()).toBeVisible();

    await waitForObservation(page);
});