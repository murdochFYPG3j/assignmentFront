/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('was-admin')
    .directive('pagination', function () {
        require: '^stTable',
        'use strict';

        return {
            templateUrl: 'app/shared/pagination/paginationView.html',
            restrict: 'E',
            replace: true,
            controller: function ($scope, $rootScope, $location) {

            }
        };
    });