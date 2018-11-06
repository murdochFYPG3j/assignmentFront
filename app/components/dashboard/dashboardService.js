angular.module('was-admin').service("DashboardService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/nomination";
    this.getAllPendingAppointments = function () {
        return Restangular.one(prefix + '/get-all-pengding-appointments').get();
    };
});
