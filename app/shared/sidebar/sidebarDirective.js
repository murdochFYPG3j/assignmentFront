angular.module('was-admin').directive('sidebar', ['$location', function () {
    'use strict';
    
    return {
        templateUrl: 'app/shared/sidebar/sidebarView.html',
        restrict: 'E',
        replace: true,
        scope: {},
        controller: function ($scope, $rootScope, $state, $location,sweetAlert) {
            $scope.$state = $state;
     
        }
    };
}]);