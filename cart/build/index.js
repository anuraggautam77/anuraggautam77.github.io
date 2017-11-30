window.utils = {

    jsonData:null,
    /**
     * number of products count
     */
    productCount:null,

    discountedData:{},

    applyCode:null,
    /**
     *  Discount codes on the basis of Items in carts
     */
    discountCriteria:{

        JF3:5,
        JF5:10,
        JF10:25


    },
    /**
     *
     * @param view: Name of template files
     * @param callback
     * @Description : get Daynmic templates Files
     */

    getTemplateString: function(view, callback) {
         $.get('templates/' + view + '.html', function(htmlString) {
             callback( htmlString);
          });

    },
    /**
     *
     * @param file
     * @param callbackSuccess
     * @dec: Ajax call to get Json Data
     */
    callTofile: function (file, callbackSuccess) {

        $.getJSON(file, function(data) {
             callbackSuccess(data);
        }).fail(function() {
                console.log( "error" );
            })
            .always(function() {
                console.log( "complete" );
            });

    },
    /**
     *
     * @Ddesc :getter or setter for json data
     * @param data
     */

    setJsonData:function(data){

        this.jsonData=data

    },

    getJsonData:function(){
         return this.jsonData;

    },
    /**
     *  Calculated data
     * @returns {*}
     */

    getSubTotalandDiscount:function(){
        this.discountedData.countPorduct=this.getJsonData().productsInCart.length;
        this.discountedData.currency=this.getJsonData().productsInCart[0].c_currency
        this.discountedData.subtotal=this.getSubTotal();
        this.discountedData.disCountPrice=this.getDiscount(this.discountedData.countPorduct,this.discountedData.subtotal);
        this.discountedData.esTimatedTotal=this.discountedData.subtotal-this.discountedData.disCountPrice
        this.discountedData.applyCode=this.applyCode;
        return this.discountedData;
    },

    getSubTotal:function(){
        var subTotal=0;
        if(this.getJsonData().hasOwnProperty('productsInCart')){
            _.forEach(this.getJsonData().productsInCart, function(prod){
                subTotal+=prod.p_price
            })
    }
        return subTotal;

    },
    /**
     * Check Discount on the basis of Item presents in cart
     * @param count
     * @param sub
     * @returns {number}
     */
    getDiscount:function(count, sub){
        var percent= 0

            if(count<=3){
                 percent=this.discountCriteria.JF3
                 this.applyCode="JF3";
             }else if(count>3 && count<=10){
                percent=this.discountCriteria.JF5
                this.applyCode="JF5";

            }else if(count>10){
                percent=this.discountCriteria.JF10
                this.applyCode="JF10";
            }else{
                 percent=0;
            }


      return  (percent/100)* sub

    },
    /**
     *  get object from Collocation of array
     * @param keyname
     * @param datacollection
     * @param keyvalue
     * @returns {*}
     */
    getObjectbyKey:function(keyname,datacollection,keyvalue){

    if (datacollection!=undefined){
       return  _.indexBy(datacollection, keyname)[keyvalue];
     }

    }

};
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

"use strict";

var EstimatedTotal= function(){

    this.templateString=null;
    this.objTemplate={
        "Estimated":"estimatedtotal"

    };
    this.templatePlaceAt=$("#estimatedtotal");
};

EstimatedTotal.prototype={

    init: function(){
        this.getTemplate();
    },
    getTemplate:function(){
        window.utils.getTemplateString([this.objTemplate.Estimated],function(data){
            this.templateString = data;
            this.renderTemplate(window.utils.getSubTotalandDiscount());
        }.bind(this))

    },

    renderTemplate:function(data){

        this.templatePlaceAt.html(_.template(this.templateString)({
            amount: data
        }))


        this.bindEvents();
    },

    bindEvents:function(){



    }


}


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
/**
 * Created by anurag on 18-02-2017.
 */

 class APPLICATION {
     
    constructor (){
        this.jsonPath = "assets/cart.json";
     }
  invokeApp() {
      this.getjsonData();

   }

  getjsonData() {

      window.utils.callTofile(this.jsonPath, (data)=>{
      window.utils.setJsonData(data);
         var cart = new CartApp(),  promo = new PromoCode(), discount = new Discount(),  estimatedtotal = new EstimatedTotal();
         cart.init(); promo.init();  discount.init();   estimatedtotal.init();
  });

}


};

var app = new APPLICATION();
app.invokeApp();