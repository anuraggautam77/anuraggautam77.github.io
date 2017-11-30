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