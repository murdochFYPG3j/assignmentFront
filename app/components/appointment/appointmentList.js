angular.module('was-admin').controller('AppointmentListController', function ($scope, $rootScope, $stateParams, $uibModal, SpecialCollectionService, Constants, $q, PaginationService, sweetAlert, MomentDateService,$state) {
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
        ctrl.allStatuses=[{name:'Pending',
                          code:'PENDING'},
                          {name:'Approved',
                          code:'APROVED'},
                          {name:'Rejected',
                          code:'REJECTED'}]
       /* var SpecialCollectionTypePromise = SpecialCollectionService.getAllSpecialCollectionType();
        var SpecialCollectionStatusPromise = SpecialCollectionService.getAllSpecialCollectionStatus();
        $q.all([SpecialCollectionTypePromise, SpecialCollectionStatusPromise]).then(function (data) {
            ctrl.allTypes = data[0];
            ctrl.allStatuses = data[1];
            
        });*/
       
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
           /* var resultPromise = SpecialCollectionService.getAllSpecialCollection(ctrl.mergedSearchDTO);
            $q.all([resultPromise]).then(function (data) {
                PaginationService.setPaginationResult(ctrl, tableState, data);
                ctrl.websites = ctrl.records;
               
                        
           
            });*/
           
        }
    };
    ctrl.downloadCsv = function () {
        return SpecialCollectionService.downloadCsv(ctrl.mergedSearchDTO);
    };
    

    
    ctrl.showDetailPage = function (app) {
        //show as page
       // $state.go('appointment.detail', {'webID' : app.id });
        //show as modal
        console.log('run1');
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
        });
    };
    ctrl.saveConfirm = function () {
       
        if (ctrl.maxCount!=4) {
            sweetAlert.swal({
                text: "There must be a total of 4 featured collection ",
                type: 'warning',
                icon: 'warning',
                confirmButtonText: "Ok",
            });
        }
        else {
            var updateinputValue = sweetAlert.swal({
                text: "Do you want to continue ?",
                showCancelButton: true,
                confirmButtonText: "Continue",
            }).then(function (response) {
                if (response.value == true) {
                    var param = [];
                    angular.forEach(ctrl.specialCollectionList, function (data) {
                        param.push({
                            id: data,
                            featureFlagCode:Constants.FEATURE_FLAG_YES,
                            
                        });
                    });

                    
                    var result = SpecialCollectionService.saveSpecialCollection(param);
                    result.then(function (data) {
                        ctrl.loading = false;
                      
                        if (data.successFlag == 'YES') {
                            sweetAlert.swal({
                                type: 'success',
                                text: data.result
                            });
                            PaginationService.resetPagination(ctrl,0,Constants.PAGE_SIZE);
                            ctrl.initial();
                            ctrl.maxCount = 0;
                            
                            ctrl.paginate(ctrl.tableState);
                        } else if (data.successFlag == 'NO') {
                            sweetAlert.swal({
                                text: data.result,
                                icon: "warning",
                                type: "warning",
                                buttons: true,
                                dangerMode: true,
                            });
                        }
                    }, function (response) {});
                } else {}
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
