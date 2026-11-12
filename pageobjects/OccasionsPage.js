class OccasionsPage {
    constructor(page) {
        this.page = page;

        // Target the visible "Occasions" link in the desktop header navigation
        this.occasionsLink = page
            .locator(".mntl-header-nav, #mntl-header-nav_1-0")
            .getByRole("link", { name: /occasions/i })
            .filter({ visible: true })
            .first();
    }

    async open() {
        await this.page.goto(
            "https://www.allrecipes.com/ingredients-a-z-6740416",
            { waitUntil: "domcontentloaded", timeout: 60000 }
        );
    }

    async openWebsite() {
        await this.open();
    }

    async clickOccasions() {
        await this.occasionsLink.scrollIntoViewIfNeeded();

        // Dismiss cookie consent banner if present in headed mode
        const cookieBtn = this.page.locator('#onetrust-accept-btn-handler, button:has-text("Accept")').first();
        if (await cookieBtn.isVisible().catch(() => false)) {
            await cookieBtn.click().catch(() => {});
        }

        await Promise.all([
            this.page.waitForURL(/holidays-and-events|occasions/i, { timeout: 30000 }).catch(() => {}),
            this.occasionsLink.click({ force: true }),
        ]);
        await this.page.waitForLoadState("domcontentloaded");
    }
}

module.exports = OccasionsPage;