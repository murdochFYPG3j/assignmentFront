angular.module('was-admin').controller('appointmentManageController', function ($scope, $rootScope, $stateParams, $uibModal, Constants, $q, PaginationService, sweetAlert,$state,AppointmentManagementService) {
    'use strict';
    var ctrl = this;

    ctrl.initial = function () {
        ctrl.initial = function () {
            var day=new Date();
            var month=day.getMonth();
            /* var appoinmentPromise=AppoinmentService.getAllSlotFromMonth(month);

        $q.all([appoinmentPromise]).then(function (data) {

            ctrl.appointmentMonths = data;



        });*/

            ctrl.appointmentMonths=[
                {Monday:
                 {
                     status:'full',
                     day:1,
                     isInMonth:'YES'},
                 Tuesday:{
                     status:'full',
                     day:2,
                     isInMonth:'YES'},
                 Wednesday:{status:'full',
                            day:3,
                            isInMonth:'YES'},

                 Thuesday:{status:'full',
                           day:4,
                           isInMonth:'YES'},
                 Friday:{status:'full',
                         day:5,
                         isInMonth:'YES'},
                 Saturday:{status:'full',
                           day:6,
                           isInMonth:'YES'},
                 Sunday:{status:'full',
                         day:7,
                         isInMonth:'YES'}},
                {Monday:{
                    status:'full',
                    day:8,
                    isInMonth:'YES'},
                 Tuesday:{
                     status:'full',
                     day:9,
                     isInMonth:'YES'},
                 Wednesday:{status:'full',
                            day:10,
                            isInMonth:'YES'},

                 Thuesday:{status:'full',
                           day:11,
                           isInMonth:'YES'},
                 Friday:{status:'full',
                         day:12,
                         isInMonth:'YES'},
                 Saturday:{status:'full',
                           day:13,
                           isInMonth:'YES'},
                 Sunday:{status:'full',
                         day:14,
                         isInMonth:'YES'}},
                {

                    Monday:{
                        status:'full',
                        day:15,
                        isInMonth:'YES'},
                    Tuesday:{
                        status:'full',
                        day:16,
                        isInMonth:'YES'},
                    Wednesday:{status:'full',
                               day:17,
                               isInMonth:'YES'},

                    Thuesday:{status:'full',
                              day:18,
                              isInMonth:'YES'},
                    Friday:{status:'full',
                            day:19,
                            isInMonth:'YES'},
                    Saturday:{status:'full',
                              day:20,
                              isInMonth:'YES'},
                    Sunday:{status:'full',
                            day:21,
                            isInMonth:'YES'}},
                {Monday:{
                    status:'full',
                    day:22,
                    isInMonth:'YES'},
                 Tuesday:{
                     status:'full',
                     day:23,
                     isInMonth:'YES'},
                 Wednesday:{status:'full',
                            day:24,
                            isInMonth:'YES'},

                 Thuesday:{status:'full',
                           day:25,
                           isInMonth:'YES'},
                 Friday:{status:'full',
                         day:26,
                         isInMonth:'YES'},
                 Saturday:{status:'available',
                           day:27,
                           isInMonth:'YES',
                           userList:[{name:'liu',
                                    },
                                    {name:'liu1'}],
                           slots:[{
                               userName:'liu',
                               startTime:'10:30 am',
                               endTime:'11:00 am'

                           },{ userName:'liu1',
                               startTime:'11:00 am',
                               endTime:'11:30 am'
                           }
                                 ]
                          },
                 Sunday:{status:'full',
                         day:28,
                         isInMonth:'NO'}}
            ]
            //ctrl.clearSearchKey();
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
    
    ctrl.displayDay=function(day){
        ctrl.selectedDay=day;
    }
    
    ctrl.createAppoinment=function(slots){
        if(slots){
            slots.push({
                startTime:ctrl.startTime.getHours()+':'+ctrl.startTime.getMinutes(),
                endTime:ctrl.startTime.getHours()+':'+ctrl.startTime.getMinutes()

            });
        }else{
            slots=[];
            slots.push({
                startTime:ctrl.startTime.getHours()+':'+ctrl.startTime.getMinutes(),
                endTime:ctrl.startTime.getHours()+':'+ctrl.startTime.getMinutes()
                
            });
        }
        ctrl.startTime=null;
        ctrl.endTime=null;
    }
    


    
    


    ctrl.downloadCsv = function () {
        return SpecialCollectionService.downloadCsv(ctrl.mergedSearchDTO);
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
