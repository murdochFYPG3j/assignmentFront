angular.module('was-admin').service("ProfileService", function ($q, $rootScope, Restangular) {
    


    

    this.getUserDetail = function () {
        return Restangular.one('/auth/me').get();
    };
    
    this.updateUserDetail=function(param){
        return Restangular.all('/auth/me').post(param);
    }
    

});
