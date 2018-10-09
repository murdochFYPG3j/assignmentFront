angular.module('was-admin').service("DashboardService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/nomination";
    this.getAllNominations = function () {
        return Restangular.one(prefix + '/get-all-nominations-pending').get();
    };
});
