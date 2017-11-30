"use strict";
/**
 *
 * @constructor
 */
var CartApp = function() {
    this.templateString = null;
    this.cartCount = null;
    this.templatePlaceAt = $("#rowCart");
    this.lowerContiner = $(".lowerContiner");
    this.objTemplateName = {
        "LIST": "list"
    }
};

CartApp.prototype.init = function() {
    this.getTemplate();

};
/**
 * Get template string by passing template name as parameter
 */
CartApp.prototype.getTemplate = function() {

    window.utils.getTemplateString([this.objTemplateName.LIST], function(data) {
        this.templateString = data;
        this.renderTemplate();
    }.bind(this))

};
/**
 *  render Template
 */
CartApp.prototype.renderTemplate = function() {

    //this.updatePriceQty();
    this.cartCount = window.utils.getJsonData().productsInCart.length;
    this.templatePlaceAt.html(_.template(this.templateString)({
        products: window.utils.getJsonData().productsInCart
    }));

    this.bindEvents();

};

CartApp.prototype.cartUpdate = function(data, pid) {

    var previousCartData = window.utils.getJsonData();
    _.each(previousCartData.productsInCart, function(cart, index) {
        if (cart.p_id == pid) {
            previousCartData.productsInCart[index] = data;
        }
    });

    window.utils.setJsonData(previousCartData);
    this.updateDom();
},

    CartApp.prototype.updateDom = function() {
        var promo = new PromoCode(),
            discount = new Discount(),
            estimatedtotal = new EstimatedTotal();
        this.init();
        if (this.cartCount == 0) {

            alert("Cart iss empty");
            this.lowerContiner.empty();

        } else {
            promo.init();
            discount.init();
            estimatedtotal.init();
        }

    }


CartApp.prototype.bindEvents = function() {
    $(".editbutton").on("click", this.editClickHandeler.bind(this));
    $(".deletebutton").on("click", this.deleteClickHandeler.bind(this));


};

CartApp.prototype.editClickHandeler = function(e) {

    var getProId = e.currentTarget.getAttribute("id").split("_")[1];
    var objSingleCartdetail = window.utils.getObjectbyKey("p_id", window.utils.getJsonData().productsInCart, getProId);
    this.triggerOverlay(objSingleCartdetail, getProId)

};
CartApp.prototype.deleteClickHandeler = function(e) {

    var getProId = e.currentTarget.getAttribute("id").split("_")[1];
    var data = _.filter(window.utils.getJsonData().productsInCart, function(o) {
        return o.p_id != getProId;
    });

    window.utils.setJsonData({
        productsInCart: data
    });
    this.cartCount = window.utils.getJsonData().productsInCart.length;
    alert(this.cartCount);
    this.updateDom();

};

CartApp.prototype.triggerOverlay = function(cartData, id) {

    var editCart = new UpdateCart(cartData, id)
    editCart.getTemplate()

};