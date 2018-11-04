angular.module('was-admin').service("forgetService", function (Restangular) {

    var prefix = "/auth/";

    this.submitEmailForForgetPassword = function (email) {
        return Restangular.all(prefix + "forget-password").post(email);
    };

  /*  this.getUserRoles = function () {
        return Restangular.one(prefix + "get-user-group").get();
    };*/
    
    this.logout = function(){
        return Restangular.one(prefix + "ssoa-logout").get();
    };
    
});
