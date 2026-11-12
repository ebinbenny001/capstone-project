async function waitForObservation(page) {
    await page.waitForTimeout(2500);
}

module.exports = { waitForObservation };
