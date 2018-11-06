angular.module('was-admin').service("ProfileService", function ($q, $rootScope, Restangular) {
    var prefix = "";


    this.getAllNominations = function () {
        return Restangular.all(prefix + '/get-all-nominations').getList();
    };

    this.getUserDetail = function (param) {
        return Restangular.all(prefix + '/get-all-appointmentList').post(param);
    };
    

});
