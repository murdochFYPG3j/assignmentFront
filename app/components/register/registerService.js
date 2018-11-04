angular.module('was-admin').service("RegisterService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/register/";
    this.submitUser=function(param){
        return Restangular.all(prefix+"submit-registraction").post(param);
    };
    


    /*this.getAllNominationType=function(){
        
        return Restangular.all(prefix+"get-all-nomination-types").getList();
    };
*/
    
    
});
