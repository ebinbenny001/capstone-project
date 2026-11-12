const { test, expect } = require('@playwright/test');
const OccasionsPage = require('../pages/OccasionsPage');
const { waitForObservation } = require('../utils/occasionsUtils');

test('Verify Occasions navigation', async ({ page }) => {
    const occasions = new OccasionsPage(page);

    await occasions.open();

    await expect(occasions.occasionsLink).toBeVisible();

    await occasions.clickOccasions();

    await waitForObservation(page);
});