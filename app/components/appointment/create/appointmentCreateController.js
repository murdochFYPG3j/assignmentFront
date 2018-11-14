angular.module('was-admin').controller('appointmentCreateController', function ($scope, $rootScope, $stateParams, AppoinmentService, $state, FileUploader, sweetAlert, Constants, $window, PaginationService, $q) {
    'use strict';
    var ctrl = this;
    ctrl.changeMonth = function () {
        console.log('change month' + ctrl.selectedMonth)
        angular.forEach(ctrl.appointmentMonthList, function(data){
            if(ctrl.selectedMonth===data.month){
                ctrl.appointmentMonthList=data.weeks;
            }
        });
        var appoinmentPromise = AppoinmentService.getAllSlotFromMonth(2018, ctrl.selectedMonth);
        $q.all([appoinmentPromise]).then(function (data) {
            var allAvailiableList = data.days;
            angular.forEach(allAvailiableList,function(data2){
                angular.forEach(ctrl.appointmentMonthList,function(data1){
                    if(data2.dayName===data1.Monday.day){
                        data1.Monday.slots=data2.slots;
                        data1.Monday.status='available';
                    }
                    if(data2.dayName===data1.Tuesday.day){
                        data1.Tuesday.slots=data2.slots;
                        data1.Tuesday.status='available';
                    }
                    if(data2.dayName===data1.Wednesday.day){
                        data1.Wednesday.slots=data2.slots;
                        data1.Wednesday.status='available';
                    }
                    if(data2.dayName===data1.Thuesday.day){
                        data1.Thuesday.slots=data2.slots;
                        data1.Thuesday.status='available';
                    }
                    if(data2.dayName===data1.Friday.day){
                        data1.Friday.slots=data2.slots;
                        data1.Friday.status='available';
                    }
                    if(data2.dayName===data1.Saturday.day){
                        data1.Saturday.slots=data2.slots;
                        data1.Saturday.status='available';
                    }
                    if(data2.dayName===data1.Sunday.day){
                        data1.Sunday.slots=data2.slots;
                        data1.Sunday.status='available';
                    }
                });
            });
        });
            /* var appoinmentPromise=AppoinmentService.getAllSlotFromMonth(month);

            $q.all([appoinmentPromise]).then(function (data) {

                ctrl.appointmentMonths = data;



            });*/
    }
    ctrl.displayDay = function (day) {
        ctrl.slots = day.slots;
    }
    ctrl.saveAppintment = function () {
        console.log("run change");
        var selectedAppointmentID = [];
        var isSelected = false;
        /*if (ctrl.slots.length > 1) {
            angular.forEach(ctrl.slots, function (data) {
                if (data.isSelected === 'YES') {
                    isSelected = true;
                    console.log('check data' + data.id);
                    selectedAppointmentID.push({
                        id: data.id
                    });
                }
            });
        }*/
        if(ctrl.isSelected){isSelected=true;}
        if (isSelected) {
            var param = ctrl.isSelected.id;
                 var changeResult=AppoinmentService.createAppointment(param);
        changeResult.then(function (data) {
            ctrl.loading = false;

            if (data.status == 'OK') {
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
                type: 'success'
                , text: 'Successfully save'
            });*/
        }
        else {
            sweetAlert.swal({
                text: 'No Slot selected'
                , icon: "warning"
                , type: "warning"
                , buttons: true
                , dangerMode: true
            , });
        }
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
       
            //ctrl.clearSearchKey();
    };
    ctrl.initial();
});