"use strict";

var PromoCode = function() {

    this.templateString = null;
    this.objTemplate = {
        "PROMO": "promocode"

    };
    this.placeContainer = $("#enterPromoCode");
};

PromoCode.prototype = {

    init: function() {
        this.getTemplate();
    },
    getTemplate: function() {
        window.utils.getTemplateString([this.objTemplate.PROMO], function(data) {
            this.templateString = data;
            this.renderTemplate();
        }.bind(this))

    },

    renderTemplate: function() {
        this.placeContainer.html(_.template(this.templateString))
        this.bindEvents();
    },

    bindEvents: function() {



    }


}