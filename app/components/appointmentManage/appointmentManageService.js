angular.module('was-admin').service("AppointmentManagementService", function ($q, $rootScope, Restangular,) {
    var prefix = "api/v1/special-collection";

/*    this.updateSpecialCollection = function (params) {
        return Restangular.all(prefix + '/update-special-collection').post(params);
    };*/

    
    
    this.getAllappointmentList = function(month){
        return Restangular.one(prefix + '/get-all-appointmentList'+'/'+id).get();
    };
    this.getSetupImport=function(uploadForm){
        console.log('upload file');
        var fd = $rootScope.object2FormData(uploadForm);

        return Restangular.one("/import")
            .withHttpConfig({
            transformRequest: angular.identity
        })
            .customPOST(fd, '', undefined, {
            'Content-Type': undefined
        });
    }
    

});
