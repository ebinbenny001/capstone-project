class CuisinesPage {
    constructor(page) {
        this.page = page;

        // Target the visible link in the desktop header navigation
        this.cuisinesLink = page
            .locator(".mntl-header-nav, #mntl-header-nav_1-0")
            .getByRole("link", { name: /cuisines/i })
            .filter({ visible: true })
            .first();
    }

    async openWebsite() {
        await this.page.goto(
            "https://www.allrecipes.com/ingredients-a-z-6740416",
            { waitUntil: "domcontentloaded", timeout: 60000 }
        );
    }

    async open() {
        await this.openWebsite();
    }

    async clickCuisines() {
        await this.cuisinesLink.scrollIntoViewIfNeeded();

        // Dismiss cookie consent banner if present in headed mode
        const cookieBtn = this.page.locator('#onetrust-accept-btn-handler, button:has-text("Accept")').first();
        if (await cookieBtn.isVisible().catch(() => false)) {
            await cookieBtn.click().catch(() => {});
        }

        await Promise.all([
            this.page.waitForURL(/cuisine/i, { timeout: 30000 }).catch(() => {}),
            this.cuisinesLink.click({ force: true }),
        ]);
        await this.page.waitForLoadState("domcontentloaded");
    }
}

module.exports = CuisinesPage;
