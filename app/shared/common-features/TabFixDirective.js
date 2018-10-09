angular.module('was-admin').directive('tabFix', function () {
    return function (scope, element, attrs) {
        $(element).click(function (event) {
            $(this).siblings("a").removeClass('active');           
            event.preventDefault();
            $(this).tab('show');         
        });        
    };
});