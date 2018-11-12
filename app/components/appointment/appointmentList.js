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
                          code:'PENDING'},
                          {name:'Approved',
                          code:'APROVED'},
                          {name:'Rejected',
                          code:'REJECTED'}]
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

    
    
        //initial ajax call at first time
    $scope.$watch('ctrl.tableState', function (tableState) {
        
        if (tableState) {
            ctrl.paginate(tableState);
        }
    });
    ctrl.paginate = function (tableState) {
        //console.log("ctrl "+JSON.stringify(ctrl,null,2));
        if (PaginationService.initPagination(ctrl, tableState)) {
            PaginationService.setPaginationSearch(ctrl, tableState);
            if( ctrl.searchStartDate){
                ctrl.mergedSearchDTO.publishedStartDate=ctrl.searchStartDate;
            }
            if( ctrl.searchEndDate){
               var date = new Date(ctrl.searchEndDate);
                var CurrentDay = date.getDate();
                CurrentDay=CurrentDay+1;
                date.setDate(CurrentDay);
                var endDate=date;
                ctrl.mergedSearchDTO.publishedEndDate=endDate;
            }
            ctrl.appointments=[{id:1,
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
                                endTime:new Date()}];
            /* var resultPromise = AppoinmentService.getAllAppointmentListBySearch(ctrl.mergedSearchDTO);
            $q.all([resultPromise]).then(function (data) {
                PaginationService.setPaginationResult(ctrl, tableState, data);
                ctrl.websites = ctrl.records;
               
                        
           
            });*/
           
        }
    };
    ctrl.downloadCsv = function () {
        return AppoinmentService.downloadCsv(ctrl.mergedSearchDTO);
    };
    

    
    ctrl.showDetailPage = function (app) {
       
       /* console.log('run1');
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/components/appointment/appointmentDetailView.html',
            controller: 'AppointmentDetailController',
            controllerAs: 'ctrl',
            size: 'lg',
            resolve: {
                appointments: function () {
                    return ctrl.appointments;
                },
                app: function () {
                    return app;
                }
            }
        });
        console.log('run2');
        modalInstance.result.then(function () {
            //ctrl.selected = selectedItem;
            console.log('run333');
        }, function () {
            console.log("run reload");
            ctrl.initial();
            ctrl.paginate(ctrl.tableState);
            console.log('Modal dismissed at: ' + new Date());
        });*/
    };
 
    
    ctrl.changeAppointment=function(){
        ctrl.change=true;
        var param={
            startTime:ctrl.selectedAppointment.startTime,
            endTime:ctrl.selectedAppointment.endTime
        }
        //ctrl.appointmentList=AppoinmentService.getAllAppointmentListByDay(param);
        ctrl.appointmentList=[{
            id:'1',
            startTime:"12:00:00",
            endTime:"13:00:00",
            location:'room 1'
        },{ id:'11',
            startTime:"13:00:00",
            endTime:"14:00:00",
            location:'room 1'
        }
                             ]
    }
    
    ctrl.showDetailPage=function(param){
        ctrl.selectedAppointment={
            id:param.id,
            startTime:param.startTime,
            endTime:param.endTime,
            status:param.statusName,
            location:'room 1'
        };
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
        sweetAlert.swal({
            type: 'success',
            text: 'Successfully Deleted'
        });
        /* var cancelResult=AppoinmentService.cancelAppointment(ctrl.selectedAppointment.id);
        cancelResult.then(function (data) {
            ctrl.loading = false;

            if (data.status == 'OK') {
                sweetAlert.swal({
                    type: 'success',
                    text: 'Successfully Deleted'
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
  */
    };
        ctrl.saveAppintment=function(){
            console.log("run change");
            var selectedAppointmentID=[];
            var isSelected=false;
            if( ctrl.appointmentList.length>1){
                angular.forEach(ctrl.appointmentList,function(data){
                    if(data.isSelected==='YES'){
                        isSelected=true;
                        console.log('check data'+data.id);
                        selectedAppointmentID.push({
                            id:data.id
                        });
                    }
                });
            }
           
            if(isSelected){
                var param={
                    previousAppoinmentID:ctrl.selectedAppointment.id,
                    selectedSlots:selectedAppointmentID,
                    userEmail:$rootScope.userEmail

                }
                
                 var changeResult=AppoinmentService.changeAppointment(param);
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
