angular.module('was-admin').service("RoleManagementService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/user-Managment";
    this.getAllFunctions = function () {
        return Restangular.all(prefix + '/function/get-all-functions').getList();
    };

    this.getAllRoles = function () {
        return Restangular.all(prefix + '/function/get-all-role').getList();
    };

    this.saveAllRoles = function (allRoles) {
        return Restangular.all(prefix + '/function/save-all-role').post(allRoles);
    };
    
});
