angular.module('was-admin').service("AppoinmentService", function ($q, $rootScope, Restangular) {
    var prefix = "/auth";

/*    this.updateSpecialCollection = function (params) {
        return Restangular.all(prefix + '/update-special-collection').post(params);
    };*/

    this.getAllAppointmentListBySearch = function (params) {
        return Restangular.all(prefix + '/get-all-appointment-list-by-search').post(params);
    };
    
    this.getAllappointmentList = function(){
        return Restangular.all( '/my-appointments').getList();
    };
    
    this.getAllappointmentStatus = function(){
        return Restangular.one(prefix + '/get-all-appointment-status').get();
    };
    this.getAllSlotFromMonth = function (year,month){
        var urlLink="?year="+year+'&month='+month;
        return Restangular.all("/appointment-slots/available"+urlLink).getList();
    };
    this.downloadCsv = function (month){
        return Restangular.all(prefix + '/download-all-appointment-list').post(month);
    };
    
    this.getAllAppointmentListByDay=function (param){
        return Restangular.all(prefix + '/get-all-available-slot-for-day').post(param);
    };
   
    this.cancelAppointment=function(apmt_id){
        return Restangular.all('/appointment-slot/'+apmt_id+'/cancel').post();
    }
    
    this.changeAppointment=function(param){
        return Restangular.all('/appointments').post(param);
    }
    
    this.createAppointment=function(apmt_id){
        return Restangular.all( '/appointment-slot/'+apmt_id+'/book').post();
    }
 
});
