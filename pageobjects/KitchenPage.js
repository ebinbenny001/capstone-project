class KitchenPage {
    constructor(page) {
        this.page = page;

        // On desktop, the first "In the Kitchen" link is inside the collapsed/hidden off-canvas menu.
        // Target the visible link in the header navigation (.last()) to avoid matching the hidden element.
        this.kitchenLink = page.getByRole("link", {
            name: /in the kitchen/i
        }).last();
    }

    async openWebsite() {
        await this.page.goto(
            "https://www.allrecipes.com/ingredients-a-z-6740416"
        );
    }

    async clickKitchen() {
        await this.kitchenLink.scrollIntoViewIfNeeded();
        await this.kitchenLink.click();
    }
}

module.exports = KitchenPage;