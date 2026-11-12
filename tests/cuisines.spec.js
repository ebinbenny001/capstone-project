const { test, expect } = require("@playwright/test");
const CuisinesPage = require("../pages/CuisinesPage");
const { waitForObservation } = require("../utils/cuisinesUtils");

test("Verify Cuisines navigation", async ({ page }) => {
    const cuisines = new CuisinesPage(page);

    await cuisines.openWebsite();

    await expect(cuisines.cuisinesLink).toBeVisible();

    await cuisines.clickCuisines();

    await waitForObservation(page);
});                                                                 