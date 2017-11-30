window.EmployeeViewForm = Backbone.View.extend({

    initialize: function () {
        this.render();
        
     },
     collectionData:[],
     render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
            new EmployeeListView();
             return this;
    },

    events: {
      
        "click .save"   : "beforeSave",
        "click .clear" : "resetData"
    },
 
    beforeSave: function () {
     var check = this.validationCheck();
        if (check.isValid === false) {
          utils.displayValidationErrors(check.messages);
          return false;
        }
        this.saveEmployee();
        return false;
    },
    validators:{},
    validationCheck:function(){
      var messages = {};
         this.validators.firstName = function () {
            return $("#firstName").val().length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a First name"};
        };

        this.validators.lastName = function () {
            return $("#lastName").val().length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a Last Name"};
        };

        this.validators.email = function () {
            return $("#email").val().length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a email"};
        };
         this.validators.year = function () {
            return $("#year").val().length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a your DOB"};
        };
         this.validators.month = function () {
            return $("#month").val().length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a your DOB"};
        };
         this.validators.day = function () {
            return $("#day").val().length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a your DOB"};
        };
       
        for(var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key]();
                if (check.isValid === false) {
                     messages[key] = check.message;
                }else{
                     utils.removeValidationError(key);
                 }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },
    
    saveEmployee: function () {
        var objData= {
        id: this.collectionData.length+1,
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        email:$("#email").val(),
        month:$("#month").val(),
        day:$("#day").val(),
        year:$("#year").val()
        
    };

        if(Store.getDataFromStaorage("empData")!==null){
            this.collectionData= Store.getDataFromStaorage("empData");
        }

     this.collectionData.push(objData) ;
     Store.setDataInStorage(this.collectionData,"empData");
     new EmployeeListView();
    },
   
    resetData: function (event) {
       console.log(event);
       $("#empForm")[0].reset();
       allkeys=["firstName",'lastName','email','month','day','year' ]
       for (var i in allkeys){
            utils.removeValidationError(allkeys[i]);
       }
    }

});



window.EmployeeListView = Backbone.View.extend({
    tmpt:"",
    allData:null,
    
    initialize: function () {
        var self=this;
         utils.loadTemplate(['EmployeeListView'], function(str) {
                self.tmpt= _.template(str);
                self.allData=Store.getDataFromStaorage("empData")
                self.render();
          });
        } ,
   
   
   
    render: function () {
       $('#detailData').html(this.tmpt({data:this.allData}));
       this.bindEvents();
       return this;
    },


    bindEvents: function(){
       var self=this;
      $(".delete").on('click', function(e){
           var crrtId=e.currentTarget.id;
           self.deleteRecord(crrtId)
       });
  },
 
  deleteRecord: function (id) {
          this.allData.splice(utils.getIndexFromAnArray(this.allData,id,'id'),1);
          Store.setDataInStorage(this.allData,"empData");
          this.render();
    } 

});