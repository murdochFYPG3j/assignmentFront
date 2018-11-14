angular.module('was-admin').service("createUserService", function ($q, $rootScope, Restangular) {
    var prefix = "";


    

    this.getUserDetail = function (param) {
        return Restangular.all(prefix + '/get-user-detail-by-id').post(param);
    };
    
    this.createUser=function(param){
        return Restangular.all('/users').post(param);
    }
    

});
