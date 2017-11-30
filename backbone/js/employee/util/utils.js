window.utils = {
 
    loadTemplate: function(views, callback) {

        var deferreds = [];
        var pathToTemplate="js/employee/views/templates"

        $.each(views, function(index, view) {
            
            if (window[view]) {
                
                deferreds.push($.get(pathToTemplate+'/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },

    displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
         
    },
    getIndexFromAnArray:function(arr,id,key){
          for (var i in arr) {
               if( arr[i][key]==id){
                 return i;    
               }
           }
        
    },

    addValidationError: function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },


    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },
 
};