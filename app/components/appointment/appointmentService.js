angular.module('was-admin').service("AppoinmentService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/special-collection";

/*    this.updateSpecialCollection = function (params) {
        return Restangular.all(prefix + '/update-special-collection').post(params);
    };*/

    this.submitSpecialCollection = function (params) {
        return Restangular.all(prefix + '/submit-special-collection').post(params);
    };
    
    this.getSpecialCollectionByID = function(id){
        return Restangular.one(prefix + '/get-special-collection'+'/'+id).get();
    };
    this.getAllSlotFromMonth = function (month){
        return Restangular.all(prefix + '/get-all-list-from-mont').post(month);
    };
   
 
});
