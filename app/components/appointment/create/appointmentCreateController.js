angular.module('was-admin').controller('appointmentCreateController', function ($scope, $rootScope, $stateParams, AppoinmentService, $state, FileUploader, sweetAlert, Constants,$window, PaginationService, $q) {
    'use strict';
    var ctrl = this;
   
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
                                slots:[{
                                          startTime:'10:30 am',
                                          endTime:'11:00 am'
                                          
                                         },{
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
    
    

    
  
    
   
});