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
