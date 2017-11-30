"use strict";

var Discount = function() {

    this.templateString = null;
    this.discountData = null;
    this.objTemplate = {
        "DISCOUNT": "discount"

    };
    this.templatePlaceAt = $("#subtotalDiscount");
};

Discount.prototype = {

    init: function() {

        this.getTemplate();

    },


    getTemplate: function() {
        window.utils.getTemplateString([this.objTemplate.DISCOUNT], function(data) {
            this.templateString = data;
            this.renderTemplate();
        }.bind(this))

    },

    renderTemplate: function() {
        this.templatePlaceAt.html(_.template(this.templateString)({
            amount: window.utils.getSubTotalandDiscount()
        }))
        this.bindEvents();
    },

    bindEvents: function() {



    }


}