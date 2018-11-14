angular.module('was-admin').controller('AppointmentListController', function ($scope, $rootScope, $stateParams, $uibModal, AppoinmentService, Constants, $q, PaginationService, sweetAlert, MomentDateService,$state) {
    'use strict';
    var ctrl = this;

    ctrl.initial = function () {
        ctrl.maxCount = 0;
        ctrl.isFirst=true;
        ctrl.searchStartDate=null;
        ctrl.searchEndDate=null;
        ctrl.specialCollectionList=[];
        ctrl.isUnderLimit = true;
        ctrl.searchDTO = {
            startIndex: 0,
            pageSize: Constants.PAGE_SIZE
        };
        ctrl.change=false;
        ctrl.allStatuses=[{name:'Pending',
                           code:'Pending'},
                          {name:'Approved',
                           code:'Approved'},
                          {name:'Rejected',
                           code:'Rejected'}]
        /* var allStutasPromise = AppoinmentService.getAllappointmentStatus();
        
        $q.all([SpecialCollectionTypePromise, SpecialCollectionStatusPromise]).then(function (data) {
            ctrl.allTypes = data[0];
            ctrl.allStatuses = data[1];
            
        });*/
        
       /* ctrl.appointments=[{id:1,
                            statusName:'Pending',
                            statusCode:'PENDING',
                            startTime:new Date(),
                            endTime:new Date()},
                           {id:2,
                            statusName:'Approved',
                            statusCode:'APROVED',
                            startTime:new Date(),
                            endTime:new Date()},
                           {id:3,
                            statusName:'Rejected',
                            statusCode:'REJECTED',
                            startTime:new Date(),
                            endTime:new Date()}];*/
         var resultPromise = AppoinmentService.getAllappointmentList();
            $q.all([resultPromise]).then(function (data) {
               // PaginationService.setPaginationResult(ctrl, tableState, data);
                ctrl.appointments = data;



            });

  
       
    };
    ctrl.initial();
    function forceLossFocus(){
        var activeElement = document.activeElement;
        if (activeElement) {
            activeElement.blur();
        }

    }
    
    ctrl.clearDate = function(){
        ctrl.searchStartDate=null;
        ctrl.searchEndDate=null;
    };
    
    $scope.changeMaxDate=function(model, newDate){
        ctrl.searchEndDate=newDate;

        $scope.$broadcast('pickerUpdate', 'pickerToUpdateMaxDate1', {
            maxDate: ctrl.searchEndDate, //A moment object, date object, or date/time string parsable by momentjs
        });
     
        forceLossFocus();
        ctrl.paginate(ctrl.tableState);
      
    };
    $scope.changeMinDate=function(model, newDate){
        
        ctrl.searchStartDate=newDate;
        $scope.$broadcast('pickerUpdate', 'pickerToUpdateMinDate1', {
            minDate: ctrl.searchStartDate, //A moment object, date object, or date/time string parsable by momentjs
        });
        forceLossFocus();
        ctrl.paginate(ctrl.tableState);
    };

    
    

    ctrl.downloadCsv = function () {
        return AppoinmentService.downloadCsv(ctrl.mergedSearchDTO);
    };
    


    
    ctrl.changeAppointment=function(){
        ctrl.change=true;
        var param={
            startTime:ctrl.selectedAppointment.startTime,
            endTime:ctrl.selectedAppointment.endTime
        }
        ctrl.appointmentList=[];
        ctrl.hasAvailableSlot=false;
        var appointmentListPromise= AppoinmentService.getAllSlotFromMonth(2018,ctrl.selectedMonth);
        $q.all([appointmentListPromise]).then(function (data) {
            var allAvailiableList = data.days;
            angular.forEach(allAvailiableList,function(data2){
                if(data2.dayName===ctrl.selectedDay){
                    ctrl.saveAppintment=true;
                    ctrl.appointmentList=data2.slots;
                }
            });
        });
        /*ctrl.appointmentList=[{
            id:'1',
            startTime:"12:00:00",
            endTime:"13:00:00",
            location:'room 1'
        },{ id:'11',
            startTime:"13:00:00",
            endTime:"14:00:00",
            location:'room 1'
        }
                             ]*/
    }
    
    ctrl.showDetailPage=function(param){
        ctrl.selectedAppointment={
            id:param.id,
            startTime:param.starts_at,
            endTime:param.ends_at,
            status:param.status,
            location:'room 1'
        };
            var dateFormat=new Date(param.starts_at);
            console.log('change to day'+dateFormat);
            ctrl.selectedMonth=dateFormat.getMonth();
            ctrl.selectedDay=dateFormat.getDate();
    };
    ctrl.closeModal=function(){
        console.log("close");
        ctrl.selectedAppointment=null;
        ctrl.change=false;
    };
    ctrl.closeSlot=function(){
        ctrl.change=false;
    };
    ctrl.cancelAppintment=function(){
        /*sweetAlert.swal({
            type: 'success',
            text: 'Successfully Deleted'
        });*/
         var cancelResult=AppoinmentService.cancelAppointment(ctrl.selectedAppointment.id);
        cancelResult.then(function (data) {
            ctrl.loading = false;

            if (data.Response ==='200 OK') {
                sweetAlert.swal({
                    type: 'success',
                    text: 'Successfully Deleted'
                });

            } else  {
                sweetAlert.swal({
                    text: 'Please screenShot and report to developer',
                    icon: "warning",
                    type: "warning",
                    buttons: true,
                    dangerMode: true,
                });
            }
        }, function (response) {});
  
    };
        ctrl.saveAppintment=function(){
            console.log("run change");
            var selectedAppointmentID=[];
            var isSelected=false;
            /*if( ctrl.appointmentList.length>1){
                angular.forEach(ctrl.appointmentList,function(data){
                    if(data.isSelected==='YES'){
                        isSelected=true;
                        console.log('check data'+data.id);
                        selectedAppointmentID.push({
                            id:data.id
                        });
                    }
                });
            }*/
            
            if(ctrl.isSelected){
                isSelected=true;
            }
           
            if(isSelected){
               /* var param={
                    previousAppoinmentID:ctrl.selectedAppointment.id,
                    selectedSlots:selectedAppointmentID,
                    userEmail:$rootScope.userEmail

                }*/
                AppoinmentService.cancelAppointment(ctrl.selectedAppointment.id);
                var changeResult=AppoinmentService.createAppointment(ctrl.isSelected.id);
        changeResult.then(function (data) {
            ctrl.loading = false;

            if (data.status == '200') {
                sweetAlert.swal({
                    type: 'success',
                    text: 'Successfully Changed'
                });

            } else if (data.status == 'NO') {
                sweetAlert.swal({
                    text: data.result,
                    icon: "warning",
                    type: "warning",
                    buttons: true,
                    dangerMode: true,
                });
            }
        }, function (response) {});
  
               /* sweetAlert.swal({
                    type: 'success',
                    text: 'Successfully Changed'
                });*/
            }else{
                sweetAlert.swal({
                    text: 'No Slot selected',
                    icon: "warning",
                    type: "warning",
                    buttons: true,
                    dangerMode: true,
                });
            }
           
            
        };
       
    
}).config(function ($provide)
          {
    $provide.decorator('mFormatFilter', function ()
                       {
        return function newFilter(m, format, tz)
        {
            if (!(moment.isMoment(m))) {
                return '';
            }
            return tz ? moment.tz(m, tz).format(format) : m.format(format);
        };
    });
});
