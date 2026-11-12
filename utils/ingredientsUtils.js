async function waitForObservation(page, timeout = 3000) {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(timeout);
}

module.exports = { waitForObservation };