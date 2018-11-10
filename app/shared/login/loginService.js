angular.module('was-admin').service("LoginService", function (Restangular) {

    var prefix = "/auth/";

    this.login = function (credential) {
        return Restangular.all(prefix + "login").post(credential);
    };

  /*  this.getUserRoles = function () {
        return Restangular.one(prefix + "get-user-group").get();
    };*/
    
  /*  this.logout = function(){
        return Restangular.one(prefix + "ssoa-logout").get();
    };*/
    
    this.getPersonDetail = function(){
        return Restangular.one(prefix + "me").get();
    };
    
});
