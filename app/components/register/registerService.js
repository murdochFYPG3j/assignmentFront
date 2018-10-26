angular.module('was-admin').service("RegisterService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/register/";
    this.submiteNomination=function(paramNomination){
        return Restangular.all(prefix+"submit-nomination").post(paramNomination);
    };
    


    this.getAllNominationType=function(){
        
        return Restangular.all(prefix+"get-all-nomination-types").getList();
    };

    
    this.verifyCaptcha = function(params) {
        return Restangular.all(prefix+"verify-captcha").post(params.response);
    };
});
