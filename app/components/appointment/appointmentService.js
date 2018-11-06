angular.module('was-admin').service("AppoinmentService", function ($q, $rootScope, Restangular) {
    var prefix = "/auth";

/*    this.updateSpecialCollection = function (params) {
        return Restangular.all(prefix + '/update-special-collection').post(params);
    };*/

    this.getAllAppointmentListBySearch = function (params) {
        return Restangular.all(prefix + '/get-all-appointment-list-by-search').post(params);
    };
    
    this.getAllappointmentList = function(id){
        return Restangular.one(prefix + '/get-all-appointmentList'+'/'+id).get();
    };
    
    this.getAllappointmentStatus = function(){
        return Restangular.one(prefix + '/get-all-appointment-status').get();
    };
    this.getAllSlotFromMonth = function (month){
        return Restangular.all(prefix + '/get-all-appointment-slot').post(month);
    };
    this.downloadCsv = function (month){
        return Restangular.all(prefix + '/download-all-appointment-list').post(month);
    };
    
    this.getAllAppointmentListByDay=function (param){
        return Restangular.all(prefix + '/get-all-available-slot-for-day').post(param);
    };
   
    this.cancelAppointment=function(id){
        return Restangular.all(prefix + '/cancel-appoinment').post(id);
    }
    
    this.changeAppointment=function(param){
        return Restangular.all(prefix + '/change-appoinment').post(param);
    }
    
    this.createAppointment=function(param){
        return Restangular.all(prefix + '/create-appoinments').post(param);
    }
 
});
