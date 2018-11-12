
angular.module('was-admin').service("AppointmentManagementService", function ($q, $rootScope, Restangular) {


/*    this.updateSpecialCollection = function (params) {
        return Restangular.all(prefix + '/update-special-collection').post(params);
    };*/

    
    
    this.getAllappointmentList = function(){
        return Restangular.one( '/get-all-appointmentList'+'/').get();
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
