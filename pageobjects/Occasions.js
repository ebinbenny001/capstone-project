const { expect } = require('@playwright/test');

class OccasionsPage {
    constructor(page) {
        this.page = page;
        this.occasionsLink = page.getByRole('link', { name: 'Occasions' });
    }

    async open() {
        await this.page.goto(
            'https://www.allrecipes.com/ingredients-a-z-6740416'
        );
    }

    async clickOccasions() {
        await this.occasionsLink.click();
    }
}

module.exports = OccasionsPage;