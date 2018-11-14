
angular.module('was-admin').service("AppointmentManagementService", function ($q, $rootScope, Restangular) {


/*    this.updateSpecialCollection = function (params) {
        return Restangular.all(prefix + '/update-special-collection').post(params);
    };*/

    
    
    this.getAllappointmentList = function(year,month){
        var link='?year='+year+'&month='+month
        return Restangular.all( 'appointment-slots/all'+link).getList();
    };
    
    this.downloadCsv = function(){
        return Restangular.one('/files/template.csv').get();
    };
    this.saveAllAppointments=function(appointments){
        return Restangular.all('/appointments').post(appointments);
    }
    this.getSetupImport=function(uploadForm){
        console.log('upload file');
        var fd = $rootScope.object2FormData(uploadForm);

        return Restangular.one("/import-appointments")
            .withHttpConfig({
            transformRequest: angular.identity
        })
            .customPOST(fd, '', undefined, {
            'Content-Type': undefined
        });
    }
    

});
