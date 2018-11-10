angular.module('was-admin').service("RegisterService", function ($q, $rootScope, Restangular) {
    var prefix = "/auth";
    this.submitUser=function(param){
        return Restangular.all(prefix+"/register").post(param);
    };
    


    /*this.getAllNominationType=function(){
        
        return Restangular.all(prefix+"get-all-nomination-types").getList();
    };
*/
    
    
});
