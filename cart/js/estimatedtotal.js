
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

