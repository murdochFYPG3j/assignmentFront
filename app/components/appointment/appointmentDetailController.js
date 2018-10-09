angular.module('was-admin').controller('AppointmentDetailController', function ($scope, $rootScope, $stateParams, $uibModalInstance, MomentDateService, SpecialCollectionService, FileUploader, appointments,app, Constants, sweetAlert, PaginationService, $q) {
    'use strict';
    var ctrl = this;
    ctrl.uploadValue = false;
    
    var initial = function () {
      ctrl.appointment=app;
    };
   initial();
  



   
   
    ctrl.dismissModal = function (param) {
        var result;
        if (param == 'unpublish') {
            ctrl.webDetail.statusCode = Constants.STATUS_DRAFT;
            ctrl.webDetail.bookMarkList = ctrl.bookMarkListbookMarkList;
            console.log("pass to back" + JSON.stringify(ctrl.webDetail, null, 2));
            result = SpecialCollectionService.editSpecialCollection(ctrl.webDetail);
        }
        else if (param == 'publish') {
            ctrl.webDetail.statusCode = Constants.STATUS_PUBLISHED;
            ctrl.webDetail.bookMarkList = ctrl.bookMarkList;
            console.log("pass to back" + JSON.stringify(ctrl.webDetail, null, 2));
            result = SpecialCollectionService.publishSpecialCollection(ctrl.webDetail);
        }
        else if (param == 'update') {
            ctrl.webDetail.bookMarkList = ctrl.bookMarkList;
            console.log("pass to back" + JSON.stringify(ctrl.webDetail, null, 2));
            result = SpecialCollectionService.editSpecialCollection(ctrl.webDetail);
        }
        else if (param == 'cancel') {
            $uibModalInstance.dismiss();
        }
        if (angular.isDefined(result)) {
            result.then(function (data) {
                if (data.successFlag == 'YES') {
                    sweetAlert.swal({
                        type: 'success',
                        text: data.result
                    });
                    $uibModalInstance.dismiss();
                } else {
                    sweetAlert.swal({
                        text: data.result,
                        icon: "warning",
                        type: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
            }, function (response) {});
        }
    };
    
});