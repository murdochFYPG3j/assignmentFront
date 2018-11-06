angular.module('was-admin').service("UserManagementService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/user-Managment";
    this.getAllFunctions = function () {
        return Restangular.all(prefix + '/function/get-all-functions').getList();
    };

    this.getAllRoles = function () {
        return Restangular.all(prefix + '/function/get-all-role').getList();
    };

   this.getAllUser = function (allRoles) {
        return Restangular.all(prefix + '/function/save-all-role').post(allRoles);
    };
    
    this.updateUser=function(param){
        return Restangular.all(prefix + '/update-user-detail').post(param);
    }
    
});
