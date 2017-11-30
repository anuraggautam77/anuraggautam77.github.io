'use strict';

var App = function() {
    this.jsonPath = "assets/cart.json";

};

App.prototype = {
    /**
     *  Application initialized here
     */
    start: function() {
        this.getjsonData();

    },

    /**
     *   Call a Json data and Load appropriate templates
     */
    getjsonData: function() {
        console.log(this);

        window.utils.callTofile(this.jsonPath, function(data) {

            console.log(this);
            window.utils.setJsonData(data);

            var cart = new CartApp(),
                promo = new PromoCode(),
                discount = new Discount(),
                estimatedtotal = new EstimatedTotal();
            cart.init();
            promo.init();
            discount.init();
            estimatedtotal.init();
        }.bind(this));

    }

};

var app = new App();
app.start();