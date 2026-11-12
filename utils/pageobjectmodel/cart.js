class Cart{
    constructor(page){
        this.page=page;
        this.cartlink=page.locator(".shopping_cart_link");
        this.chkoutlink=page.locator("#checkout");
        this.firstname=page.locator("#first-name");
        this.lastname=page.locator("#last-name");
        this.postalcode=page.locator("#postal-code");
        this.cntbtn=page.locator("#continue");
        this.finbtn=page.locator("#finish");
    }
    async add2cart(){
    await this.cartlink.click();
    //expect(await page.locator(".inventory_item_name ").isVisible()).toBeTruthy();
    await this.chkoutlink.click();
    await this.firstname.fill("Suryajith");
    await this.lastname.fill("C");
    await this.postalcode.fill("679121");
    await this.cntbtn.click();
    await this.finbtn.click();

}
}
module.exports=Cart;