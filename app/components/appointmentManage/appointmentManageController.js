angular.module('was-admin').controller('appointmentManageController', function ($scope, $rootScope, $stateParams, $uibModal, Constants, $q, PaginationService, sweetAlert,$state,AppointmentManagementService) {
    'use strict';
    var ctrl = this;
    ctrl.changeMonth = function () {
        console.log('change month' + ctrl.selectedMonth)
        angular.forEach(ctrl.appointmentMonthList, function(data){
            if(ctrl.selectedMonth===data.month){
                ctrl.appointmentMonthList=data.weeks;
            }
        });
        var appoinmentPromise = AppointmentManagementService.getAllappointmentList(2018, ctrl.selectedMonth);
        $q.all([appoinmentPromise]).then(function (data) {
            var allAvailiableList = data.days;
            angular.forEach(allAvailiableList,function(data2){
                angular.forEach(ctrl.appointmentMonthList,function(data1){
                    if(data2.dayName===data1.Monday.day){
                        data1.Monday.slots=data2.slots;
                    }
                    if(data2.dayName===data1.Tuesday.day){
                        data1.Tuesday.slots=data2.slots;
                        
                    }
                    if(data2.dayName===data1.Wednesday.day){
                        data1.Wednesday.slots=data2.slots;
                        
                    }
                    if(data2.dayName===data1.Thuesday.day){
                        data1.Thuesday.slots=data2.slots;
                       
                    }
                    if(data2.dayName===data1.Friday.day){
                        data1.Friday.slots=data2.slots;
                        
                    }
                    if(data2.dayName===data1.Saturday.day){
                        data1.Saturday.slots=data2.slots;
                       
                    }
                    if(data2.dayName===data1.Sunday.day){
                        data1.Sunday.slots=data2.slots;
                        
                    }
                });
            });
        });
       
    }

    ctrl.initial = function () {
        var day = new Date();
        // var month=day.getMonth();
        //var currentDay= new Date();
        ctrl.selectedMonth = day.getMonth();
        var year = day.getYear();
        ctrl.selectedMonth=11;
        year=2018;
        ctrl.appointmentMonthList = [{
            month: 11
            , weeks: [{
                Monday: {
                    status: 'full'
                    , day: ''
                    , slots: []
                }
                , Tuesday: {
                    status: 'full'
                    , day: ''
                    , slots: []
                }
                , Wednesday: {
                    status: 'full'
                    , day: ''
                    , slots: []
                }
                , Thuesday: {
                    status: 'full'
                    , day: 1
                    , isInMonth: 'YES'
                    , slots: []
                }
                , Friday: {
                    status: 'full'
                    , day: 2
                    , isInMonth: 'YES'
                    , slots: []
                }
                , Saturday: {
                    status: 'full'
                    , day: 3
                    , isInMonth: 'YES'
                    , slots: []
                }
                , Sunday: {
                    status: 'full'
                    , day: 4
                    , isInMonth: 'YES'
                    , slots: []
                }
            }
                      , {
                          Monday: {
                              status: 'full'
                              , day: 5
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Tuesday: {
                              status: 'full'
                              , day: 6
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Wednesday: {
                              status: 'full'
                              , day: 7
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Thuesday: {
                              status: 'full'
                              , day: 8
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Friday: {
                              status: 'full'
                              , day: 9
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Saturday: {
                              status: 'full'
                              , day: 10
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Sunday: {
                              status: 'full'
                              , day: 11
                              , isInMonth: 'YES'
                              , slots: []
                          }
                      }
                      , {
                          Monday: {
                              status: 'full'
                              , day: 12
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Tuesday: {
                              status: 'full'
                              , day: 13
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Wednesday: {
                              status: 'full'
                              , day: 14
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Thuesday: {
                              status: 'full'
                              , day: 15
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Friday: {
                              status: 'full'
                              , day: 16
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Saturday: {
                              status: 'full'
                              , day: 17
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Sunday: {
                              status: 'full'
                              , day: 18
                              , isInMonth: 'YES'
                              , slots: []
                          }
                      }
                      , {
                          Monday: {
                              status: 'full'
                              , day: 19
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Tuesday: {
                              status: 'full'
                              , day: 20
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Wednesday: {
                              status: 'full'
                              , day: 21
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Thuesday: {
                              status: 'full'
                              , day: 22
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Friday: {
                              status: 'full'
                              , day: 23
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Saturday: {
                              status: 'full'
                              , day: 24
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Sunday: {
                              status: 'full'
                              , day: 25
                              , isInMonth: 'NO'
                              , slots: []
                          }
                      },
                      {
                          Monday: {
                              status: 'full'
                              , day: 26
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Tuesday: {
                              status: 'full'
                              , day: 27
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Wednesday: {
                              status: 'full'
                              , day: 28
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Thuesday: {
                              status: 'full'
                              , day: 29
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Friday: {
                              status: 'full'
                              , day: 30
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Saturday: {
                              status: 'full'
                              , day: ''
                              , isInMonth: 'YES'
                              , slots: []
                          }
                          , Sunday: {
                              status: 'full'
                              , day: ''
                              , isInMonth: 'NO'
                              , slots: []
                          }
                      }]
        }
                                     , {
                                         month: 12
                                         , weeks: [{
                                             Monday: {
                                                 status: 'full'
                                                 , day: ''
                                                 , slots: []
                                             }
                                             , Tuesday: {
                                                 status: 'full'
                                                 , day: ''
                                                 , slots: []
                                             }
                                             , Wednesday: {
                                                 status: 'full'
                                                 , day: ''
                                                 , slots: []
                                             }
                                             , Thuesday: {
                                                 status: 'full'
                                                 , day: ''
                                                 , isInMonth: 'YES'
                                                 , slots: []
                                             }
                                             , Friday: {
                                                 status: 'full'
                                                 , day: ''
                                                 , isInMonth: 'YES'
                                                 , slots: []
                                             }
                                             , Saturday: {
                                                 status: 'full'
                                                 , day: 1
                                                 , isInMonth: 'YES'
                                                 , slots: []
                                             }
                                             , Sunday: {
                                                 status: 'full'
                                                 , day: 2
                                                 , isInMonth: 'YES'
                                                 , slots: []
                                             }
                                         }
                                                   , {
                                                       Monday: {
                                                           status: 'full'
                                                           , day: 3
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Tuesday: {
                                                           status: 'full'
                                                           , day: 4
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Wednesday: {
                                                           status: 'full'
                                                           , day: 5
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Thuesday: {
                                                           status: 'full'
                                                           , day: 6
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Friday: {
                                                           status: 'full'
                                                           , day: 7
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Saturday: {
                                                           status: 'full'
                                                           , day: 8
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Sunday: {
                                                           status: 'full'
                                                           , day: 9
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                   }
                                                   , {
                                                       Monday: {
                                                           status: 'full'
                                                           , day: 10
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Tuesday: {
                                                           status: 'full'
                                                           , day: 11
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Wednesday: {
                                                           status: 'full'
                                                           , day: 12
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Thuesday: {
                                                           status: 'full'
                                                           , day: 13
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Friday: {
                                                           status: 'full'
                                                           , day: 14
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Saturday: {
                                                           status: 'full'
                                                           , day: 15
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Sunday: {
                                                           status: 'full'
                                                           , day: 16
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                   }
                                                   , {
                                                       Monday: {
                                                           status: 'full'
                                                           , day: 17
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Tuesday: {
                                                           status: 'full'
                                                           , day: 18
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Wednesday: {
                                                           status: 'full'
                                                           , day: 19
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Thuesday: {
                                                           status: 'full'
                                                           , day: 20
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Friday: {
                                                           status: 'full'
                                                           , day: 21
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Saturday: {
                                                           status: 'full'
                                                           , day: 22
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Sunday: {
                                                           status: 'full'
                                                           , day: 23
                                                           , isInMonth: 'NO'
                                                           , slots: []
                                                       }
                                                   } ,{
                                                       Monday: {
                                                           status: 'full'
                                                           , day: 24
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Tuesday: {
                                                           status: 'full'
                                                           , day: 25
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Wednesday: {
                                                           status: 'full'
                                                           , day: 26
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Thuesday: {
                                                           status: 'full'
                                                           , day: 27
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Friday: {
                                                           status: 'full'
                                                           , day: 28
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Saturday: {
                                                           status: 'full'
                                                           , day: 29
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Sunday: {
                                                           status: 'full'
                                                           , day: 30
                                                           , isInMonth: 'NO'
                                                           , slots: []
                                                       }
                                                   }, {
                                                       Monday: {
                                                           status: 'full'
                                                           , day: 31
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Tuesday: {
                                                           status: 'full'
                                                           , day: ''
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Wednesday: {
                                                           status: 'full'
                                                           , day: ''
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Thuesday: {
                                                           status: 'full'
                                                           , day: ''
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Friday: {
                                                           status: 'full'
                                                           , day: ''
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Saturday: {
                                                           status: 'full'
                                                           , day: ''
                                                           , isInMonth: 'YES'
                                                           , slots: []
                                                       }
                                                       , Sunday: {
                                                           status: 'full'
                                                           , day: ''
                                                           , isInMonth: 'NO'
                                                           , slots: []
                                                       }
                                                   }

                                                  ]
                                     }


                                    ];
        ctrl.changeMonth();
       
          /*  var day=new Date();
            var month=day.getMonth();
            var appoinmentPromise=AppointmentManagementService.getAllappointmentList(2018,month);

        $q.all([appoinmentPromise]).then(function (data) {

            ctrl.appointmentMonths = data;



        });*/

            
          
        };
        ctrl.initial();
        
        $scope.uploadTemplate = function() {

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/shared/upload/appointment_upload_excel_modal.html',
                controller: function ($scope, $uibModalInstance, $rootScope) {

                    $scope.dismiss = function () {
                        $uibModalInstance.close();
                    }

                    $scope.importResult = function () {
                        console.log('11attachment:' + JSON.stringify($scope.attachment, null, 2));
                        $scope.ERegSetupResultImportDTO = '';

                        if ($scope.attachment.file[0]===undefined) {
                            $rootScope.errorHandler($scope, 'messageBannerImportModal', 'Please upload excel file');
                        }
                        else if ($scope.attachment.file[0].size > Constants.MAX_FILE_SIZE_ALLOWED) {
                            $rootScope.errorHandler($scope, 'messageBannerImportModal', 'Please ensure excel file is not bigger than 5MB');
                        }
                        else {

                            console.log('attachment:' + JSON.stringify($scope.attachment, null, 2));

                            $scope.ERegSetupResultImportDTO = {
                                sportYearId:$stateParams.sportYearId,
                                zoneCode: $stateParams.zone, 
                                filterType: "DIVISION",
                                file: $scope.attachment.file,
                            };

                            $scope.isUploading = true;

                            AppointmentManagementService.getSetupImport($scope.ERegSetupResultImportDTO).then(function (data) {
                                $scope.validationResult = data;
                                console.log('validationResult:' + JSON.stringify($scope.validationResult, null, 2));

                                $scope.isUploading = false;
                                $uibModalInstance.close();

                                if($scope.validationResult.errorCode!==null) {

                                    $rootScope.errorHandler($scope.$parent, 'messageBannerResult', $scope.validationResult.errorCode);
                                }
                                else {
                                    $rootScope.successHandler($scope.$parent, 'messageBannerResult');
                                    $scope.refreshSetup($scope);
                                    $scope.getSetup();

                                }
                            }).finally(function () {
                                // Hide Spinner
                                $scope.isUploading = false;
                                $rootScope.errorHandler($scope, 'messageBannerImportModal', 'Incorrect Excel format uploaded, error has occurred during upload. Please download template to get the correct format');

                            });
                        }
                    }               
                },
                scope: $scope,
                size: 'md',
                resolve: {

                }
            }); 
            modalInstance.result.then(function (newNominee) {
                // Do nothing.
            }, function (newNominee) {
                // Do nothing. This is just to prevent the "Possibly unhandled rejection: backdrop click" msg from being printed into the console.
            });
        };

       
    
   
   
    
    ctrl.clearDate = function(){
        ctrl.searchStartDate=null;
        ctrl.searchEndDate=null;
    };
    
    ctrl.displayDay=function(day){
        ctrl.selectedDay=day;
    }
    
    ctrl.createAppoinment=function(slots){
        if(slots){
            slots.push({
                id:null,
                startTime:ctrl.startTime.getHours()+':'+ctrl.startTime.getMinutes(),
                endTime:ctrl.startTime.getHours()+':'+ctrl.startTime.getMinutes()

            });
        }else{
            slots=[];
            slots.push({
                id:null,
                startTime:ctrl.startTime.getHours()+':'+ctrl.startTime.getMinutes(),
                endTime:ctrl.startTime.getHours()+':'+ctrl.startTime.getMinutes()
                
            });
        }
        ctrl.startTime=null;
        ctrl.endTime=null;
    }
    
    ctrl.saveAppintment=function(slots){
        AppointmentManagementService.saveAllAppointments(slots);
    }
    


    
    


    ctrl.downloadCsv = function () {
        return AppointmentManagementService.downloadCsv();
    };
    
    ctrl.uploadTemplate = function() {

        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/shared/upload/appointment_upload_excel_modal.html',
          
            size: 'md',
            backdrop : 'static',
            resolve: {
                
            }

           
        }); 
       
    };

    

    

});
