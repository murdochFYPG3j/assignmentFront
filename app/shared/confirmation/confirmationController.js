var app = angular.module('was-admin').controller('confirmationController', function ($scope, $rootScope, $stateParams, $uibModalInstance, Constants) {
    'use strict';

    var ctrl = this;
    ctrl.message = Constants.confirmMessage;
    
    //function to allow close modal
    ctrl.dismissModalCancel = function () {
        $uibModalInstance.dismiss(false);
    };
    
    ctrl.dismissModalSave = function () {
        $uibModalInstance.dismiss(true);
    };

});
