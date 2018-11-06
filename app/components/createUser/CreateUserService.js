angular.module('was-admin').service("createUserService", function ($q, $rootScope, Restangular) {
    var prefix = "";


    

    this.getUserDetail = function (param) {
        return Restangular.all(prefix + '/get-user-detail-by-id').post(param);
    };
    
    this.updateUserDetail=function(param){
        return Restangular.all(prefix + '/update-user-detail').post(param);
    }
    

});
