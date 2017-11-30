var AppRouter = Backbone.Router.extend({

    routes: {
          "employee/add"       :"addEmployee",
        "*actions" :"addEmployee"
    },

    initialize: function () {
         this.topBar = new TopBar();
        $('.header').html(this.topBar.el);
    },



    addEmployee: function() {
         var empModel = new EmployeeModel();
         var empViewForm =new EmployeeViewForm({model: empModel});
         $('#content').html(empViewForm.el);
         this.topBar.selectMenuItem('add-menu');
	}

   

});

utils.loadTemplate(['TopBar','EmployeeViewForm'], function() {
    app = new AppRouter();
    Backbone.history.start();
});