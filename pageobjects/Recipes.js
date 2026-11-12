class RecipesPage {
    constructor(page) {
        this.page = page;
        this.searchBox = page.locator(
            '#mntl-search-form--open__search-input, input[name="q"]:visible, input[type="search"]'
        ).first();
        this.recipeLinks = page.locator(
            '#mntl-search-results__list_1-0 a[href*="/recipe/"], a[href*="/recipe/"]'
        );
    }

    async openWebsite() {
        await this.page.goto("https://www.allrecipes.com/");
    }

    async searchRecipe(recipe) {
        await this.searchBox.waitFor({ state: "visible" });
        await this.searchBox.fill(recipe);
        await this.searchBox.press("Enter");
        await this.page.waitForURL(/search/i);
    }

    async openFirstRecipe() {
        const firstLink = this.recipeLinks.first();
        await firstLink.waitFor({ state: "visible" });
        await firstLink.click();
    }
}

module.exports = RecipesPage;