class Dashboard {
    constructor(page) {
        this.page = page;
        this.product = page.locator(".inventory_item_name");
        this.productname = page.locator(".inventory_item");
        this.cart = page.locator(".shopping_cart_link");
    }

    async selectProduct(productname) {
        await this.product.first().waitFor();
        const Count = await this.product.count();
        for (let i = 0; i < Count; i++) {
            const currentProductName = (await this.product.nth(i).textContent()).trim();
            if (currentProductName === productname) {
                await this.productname.nth(i).locator("text=Add to cart").click();
                break;
            }
        }
    }

    async moveToCart() {
        await this.cart.click();
    }
}

module.exports = Dashboard;