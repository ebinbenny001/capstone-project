const Dashboard = require("./dashboard");
const Login = require("./login");
const Cart = require("./cart");

class pomanager {
    constructor(page) {
        this.page = page;
        this.login = new Login(page);
        this.dashboard = new Dashboard(page);
        this.cart = new Cart(page);
    }

    getLogin() {
        return this.login;
    }

    getDashboard() {
        return this.dashboard;
    }

    getCart() {
        return this.cart;
    }
}

module.exports = PoManager;