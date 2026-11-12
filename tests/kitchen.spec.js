const { test, expect } = require("@playwright/test");
const KitchenPage = require("../pages/KitchenPage");
const { waitForObservation } = require("../utils/kitchenUtils");

test("Verify In the Kitchen navigation", async ({ page }) => {
    const kitchen = new KitchenPage(page);

    await kitchen.openWebsite();

    await expect(kitchen.kitchenLink).toBeVisible();

    await kitchen.clickKitchen();

    await waitForObservation(page);
});