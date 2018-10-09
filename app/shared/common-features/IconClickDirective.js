angular.module('was-admin').directive('buttonStar', function() {
    return {
        scope: true,
        restrict: 'E',
        template: '<button class="btn btn-icon"><span class="fa fa-star" ng-class="{active: item.star}"></span></button>',
        link: function(scope, elem) {
            elem.bind('click', function() {
                scope.$apply(function(){
                    scope.item.star = !scope.item.star;
                });
            });
        }
    };
});