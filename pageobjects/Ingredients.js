class IngredientsPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: /ingredients a-z/i }).first();
        this.searchBar = page.getByPlaceholder(/Find a recipe|Search/i).first();
        this.letterA = page.getByRole('link', { name: 'A', exact: true }).first();
        this.almondMeal = page.getByText('Almond Meal', { exact: true });
        this.almonds = page.getByText('Almonds', { exact: true });
    }

    async open() {
        await this.page.goto('https://www.allrecipes.com/ingredients-a-z-6740416', {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });
    }

    async openWebsite() {
        await this.open();
    }

    async searchIngredient(name) {
        await this.searchBar.fill(name);
        await this.searchBar.press('Enter');
    }

    async clickLetterA() {
        await this.letterA.scrollIntoViewIfNeeded();

        // Dismiss cookie consent banner if present in headed mode
        const cookieBtn = this.page.locator('#onetrust-accept-btn-handler, button:has-text("Accept")').first();
        if (await cookieBtn.isVisible().catch(() => false)) {
            await cookieBtn.click().catch(() => {});
        }

        await this.letterA.click();
    }
}

module.exports = IngredientsPage;