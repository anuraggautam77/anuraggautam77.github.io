window.EmployeeModel = Backbone.Model.extend({
  initialize: function () {
   } ,

    defaults: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        month: "",
        day:"",
        year:""
        
    }
});
