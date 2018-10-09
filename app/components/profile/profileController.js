angular.module('was-admin').controller('profileController', function ($scope, $rootScope, $stateParams, $uibModal, NominationService, PaginationService, $q, Constants, sweetAlert, MomentDateService, $window) {
    'use strict';
    var ctrl = this;
    ctrl.filteredList = [];

    function initial() {
        ctrl.selectedUserDetails={firstName:'Test',
                                 lastName:'TestLast',
                                 emailAddress:'email@c.com',
                                 loginId:'user',
                                 contactNo:8188888};
   //     console.log("Innital"+JSON.stringify(ctrl.nominations,null,2));
    }
    initial();
    
   
})