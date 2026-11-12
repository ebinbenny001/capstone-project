async function waitForObservation(page, timeout = 5000) {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(timeout);
}

module.exports = { waitForObservation };