class DinnerPage {
    constructor(page) {
        this.page = page;
        this.searchBar = page
            .getByPlaceholder(/Find a recipe|Search/i)
            .first();
        this.searchBox = this.searchBar;
        this.heading = page.getByRole('heading', { name: /dinner/i }).first();
    }

    async open() {
        await this.page.goto('https://www.allrecipes.com/recipes/17562/dinner/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });
    }

    async openWebsite() {
        await this.open();
    }

    async searchRecipe(recipe) {
        await this.searchBar.waitFor({ state: 'visible' });
        await this.searchBar.fill(recipe);
        await this.searchBar.press('Enter');
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    }
}

module.exports = DinnerPage;