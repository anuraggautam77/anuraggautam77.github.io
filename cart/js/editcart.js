"use strict";

var UpdateCart = function(data, id) {

    this.templateString = null;
    this.objTemplate = {
        "EDITCART": "editcart"

    };
    this.currentId = id;
    this.currentData = data
    this.templatePlaceAt = $("#editcartoverlay");
};

UpdateCart.prototype = {

    init: function() {
        this.getTemplate();
    },
    getTemplate: function() {

        window.utils.getTemplateString([this.objTemplate.EDITCART], function(data) {
            this.templateString = data;
            this.renderTemplate();
        }.bind(this))

    },

    renderTemplate: function() {

        this.templatePlaceAt.html(_.template(this.templateString)({
            cartdata: this.currentData
        }));

        this.bindEvents();


    },

    bindEvents: function() {

        $(".color_button").on("click", this.colordivClickhandeler.bind(this));
        $("#sizedropdown").on("change", this.sizedrpdownhandeler.bind(this));
        $("#qtydropdown").on("change", this.qtydrpdownClickhandeler.bind(this));
        $("#editbutton").on("click", this.updateCartList.bind(this));
        $(".close").on("click", this.hideOverlay.bind(this));


    },

    colordivClickhandeler: function(e) {

        $(e.currentTarget).addClass('selected').siblings().removeClass('selected');
        var selectedColor = e.currentTarget.getAttribute("id");
        this.currentData.p_selected_color.name = selectedColor.split("_")[1]
        this.currentData.p_selected_color.hexcode = selectedColor.split("_")[0]

    },

    sizedrpdownhandeler: function(e) {


        var size = $(e.currentTarget).val();

        this.currentData.p_selected_size.name = size.split("_")[0]
        this.currentData.p_selected_size.code = size.split("_")[1]

    },
    qtydrpdownClickhandeler: function(e) {


        var qty = $(e.currentTarget).val();
        this.currentData.p_quantity = qty;


    },

    updateCartList: function() {

        var cart = new CartApp();
        cart.cartUpdate(this.currentData, this.currentId)

        $("#editcartoverlay").empty();

    },

    hideOverlay: function() {

        $("#editcartoverlay").empty();
    }



}