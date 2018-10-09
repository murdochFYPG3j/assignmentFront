angular.module('was-admin').controller('DashboardController', function ($scope, $rootScope, $stateParams, $uibModal, Constants, DashboardService, $q,$state) {
    'use strict';
    var ctrl = this;
    var initial = function(){
        ctrl.nominationNumber=3;
        //console.log('check');
        /*DashboardService.getAllNominations().then(function(data){
            ctrl.result=data;
            
            ctrl.nominationNumber=ctrl.result.totalNumber;
        });*/
    };
    initial();
    ctrl.directFunc = function(){
        $state.go('appoinmentManagement.list');
    };


});
