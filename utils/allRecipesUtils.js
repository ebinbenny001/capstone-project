async function waitForObservation(page) {
    await page.waitForLoadState('domcontentloaded');
}

module.exports = { waitForObservation };