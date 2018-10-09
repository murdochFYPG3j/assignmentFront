/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('was-admin')
    .directive('header', function () {

        'use strict';

        return {
            templateUrl: 'app/shared/header/headerView.html',
            restrict: 'E',
            replace: true,
            controllerAs: 'ctrl',
            controller: function ($scope, $rootScope, $state, sweetAlert) {
                var ctrl = this;
                ctrl.state = $state;

                if (!ctrl.module) {
                    ctrl.module = 'SPECIAL_COLLECTION';
                }

                ctrl.redirect = function (module) {
                    $rootScope.module = module;
                    switch (module) {
                        case 'APP':
                            $state.go('appointment.list');
                            break;
                        case 'PROFILE':
                            $state.go('profile.list');
                            break;
                        case 'APP_MGMT':
                            $state.go('appointmentManage.list');
                            break;
                        case 'USER_MGMT':
                            $state.go('userManagement.list');
                            break;
                       
                        default:
                            $state.go('landing');
                    }
                };

                function alertModuleNotAvailable() {
                    $rootScope.module = 'HOME';
                    sweetAlert.swal({
                        type: 'warning',
                        text: 'Currently the module is not available yet 2'
                    }).then(function (response) {
                        $state.go('landing');
                    });
                }
            }
        };
    });
