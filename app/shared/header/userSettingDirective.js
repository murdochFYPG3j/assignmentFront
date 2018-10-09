angular.module('was-admin').directive('userSetting', ['$location', function () {
    'use strict';

    return {
        templateUrl: 'app/shared/header/userSettingView.html',
        restrict: 'E',
        replace: true,
        scope: {},
        controller: function ($scope, $rootScope, $filter, $state, sweetAlert, $location, Restangular, Constants, $q, LoginService) {
            
            $scope.logoutUrl = Constants.LOGOUT_URL;
            
            $scope.$state = $state;
            $rootScope.userRoleFunctions = [{name:'user',
                                        code:'user'},
                                       {name:'admin',
                                        code:'admin'},
                                       {name:'convener',
                                        code:'convener'}];

            
      /*  LoginService.getUserRoles().then(function (rolesDTO) {

                $rootScope.userRoleFunctions = rolesDTO.userRoles;
                $rootScope.username = rolesDTO.username;
                

                if (!$rootScope.selectedRole) {

                    $rootScope.selectedRole = $rootScope.userRoleFunctions[0];
                }
                
            });    */   
            
            
            $scope.updateSelectedRole = function (role) {
                
                $rootScope.selectedRole=role;
                console.log("$rootScope.selectedRole: " + JSON.stringify($rootScope.selectedRole, null, 2));
                
                $state.go('landing.view');
                
            };                  
            
            $scope.logout = function(){

                $state.go('login');
                /*LoginService.logout().then(function(data){
                    
                   // console.log(JSON.stringify(data));
                });*/
            };
        }
    };
}]);