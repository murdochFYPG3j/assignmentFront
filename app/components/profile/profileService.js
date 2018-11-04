angular.module('was-admin').service("ProfileService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/nomination";


    this.getAllNominations = function () {
        return Restangular.all(prefix + '/get-all-nominations').getList();
    };

    this.getUserDetail = function (param) {
        return Restangular.all(prefix + '/get-user-detail').post(param);
    };
    
    this.updateUserDetail = function (param) {
        return Restangular.all(prefix + '/update-user-detail').post(param);
    };
     
/*
    this.updateNominationForm = function (param) {
        return Restangular.all(prefix + '/update-nomination').post(param);
    };
    
    this.rejectNomination = function (param) {
        return Restangular.all(prefix + '/edit-nomination').post(param);
    };

    this.getAllNominationType = function () {
        return Restangular.all(prefix + "/get-all-nomination-types").getList();
    };

    this.getAllnominationStatus = function () {
        return Restangular.all(prefix + "/get-all-nomination-statuses").getList();
    };
    
    this.downloadCsv = function(data) {
        return Restangular.all(prefix + "/download-csv").post(data);
    };
    
    this.getNominations = function(params){
        return Restangular.all(prefix + '/get-nominations').post(params);
    };
    
    this.getEmailTemplate=function(param){
        return Restangular.all(prefix + "/get-email-templates").post(param);
    };
    
    this.getRejectReasons=function(){
        return Restangular.all(prefix + "/get-reject-reason").getList();
    };
*/

});
