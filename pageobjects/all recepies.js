class RecipePage {
    constructor(page) {
        this.page = page;

        this.saveButton = page.getByRole('button', {
            name: /save/i
        });

        this.reviewBox = page.getByRole('textbox', {
            name: /my review/i
        }).or(page.getByPlaceholder(
            /what did you think about this recipe/i
        ));

        this.rating = page.getByRole('radio', {
            name: /rate this a 5|5 star/i
        });
    }

    async open() {
        await this.page.goto(
            'https://www.allrecipes.com/recipes/17562/dinner/'
        );
    }

    async openRecipe() {
        await this.page.getByText('Easy Oven Pulled Pork', {
            exact: true
        }).click();
    }

    async writeReview(text) {
        await this.reviewBox.fill(text);
    }
}

module.exports = RecipePage;
