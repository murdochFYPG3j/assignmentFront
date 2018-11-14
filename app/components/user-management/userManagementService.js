angular.module('was-admin').service("UserManagementService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/user-Managment";
    this.getAllFunctions = function () {
        return Restangular.all(prefix + '/function/get-all-functions').getList();
    };

    this.getAllRoles = function () {
        return Restangular.all(prefix + '/function/get-all-role').getList();
    };

   this.getAllUser = function () {
       return Restangular.all('/users').getList();
    };
    
    this.updateUser=function(id,param){
      
        return Restangular.all('/users/'+id).post(param);
    }
    
});
