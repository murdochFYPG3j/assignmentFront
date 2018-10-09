angular.module('was-public').service("ModalService", function ($uibModal) {

    /**
     * This service is designed to allow easy displaying of modals, while cleaning up multiple popups, preventing from spamming the user with popups.
     */

    var registeredModals = {
        confirm: [],
        error: []
    };
    var INTERRUPT_REPLACE_MESSAGE = "Interrupted, modal is being replaced.";

    /* [ Registered Modal Controls ] ==================== */

    this.dismissModal = function (identifier, reason, type) {
        var modal = null;
        if (type) {
            modal = registeredModals[type][identifier];
        } else {
            modal = registeredModals.confirm[identifier] || registeredModals.error[identifier];
        }

        //        console.log("Dismissing");
        //        console.log(modal);

        if (modal) {
            modal.dismiss(reason);
        }
    };

    /* [ Private Methods ] ==================== */

    var openConfirmModal = function (confirmMsg, config) {
        return $uibModal.open({
            template: '<div class="modal-header" style="z-index: 99000 !important"><button type="button" class="close" ng-click="dismissModal()">&times;</button><h4 class="modal-title pre-word-wrap">{{confirmTitle}}</h4></div><div class="modal-body"><p class="pre-word-wrap" ng-bind-html=\"confirmMessage\"></p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="closeModal()">Confirm</button><button class="btn btn-default" type="button" ng-click="dismissModal()">Cancel</button></div>',
            controller: function ($scope, $uibModalInstance, confirmMessage, confirmTitle) {
                $scope.confirmTitle = confirmTitle;
                $scope.confirmMessage = confirmMessage;

                $scope.dismissModal = function () {
                    $uibModalInstance.dismiss();
                };

                $scope.closeModal = function () {
                    $uibModalInstance.close();
                };
            },
            size: config.size || 'sm',
            windowClass: 'confirm-window',
            resolve: {
                confirmTitle: function () {
                    return config.title || "Confirm?";
                },
                confirmMessage: function () {
                    return confirmMsg || Messages.GENERIC_CONFIRM;
                }
            }
        });
    };

    var openErrorModal = function (errMsg, config) {
        return $uibModal.open({
            template: '<div class="modal-header"><button type="button" class="close" ng-click="dismissModal()">&times;</button><h4 class="modal-title pre-word-wrap">{{errTitle}}</h4></div><div class="modal-body"><p class="pre-word-wrap" ng-bind-html=\"errorMessage\"></p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="closeModal()">Ok</button></div>',
            controller: function ($scope, $uibModalInstance, errorMessage, errTitle) {
                $scope.errTitle = errTitle;
                $scope.errorMessage = errorMessage;

                $scope.dismissModal = function () {
                    $uibModalInstance.dismiss();
                };

                $scope.closeModal = function () {
                    $uibModalInstance.close();
                };
            },
            size: config.size || 'sm',
            windowClass: 'error-window',
            resolve: {
                errTitle: function () {
                    return config.title || "Error";
                },
                errorMessage: function () {
                    return errMsg || Messages.GENERIC_ERROR;
                }
            }
        });
    };

    /* [ Generic Modals (Popups) ] ==================== */

    /*
     * Function to open a confirmation message modal.
     *
     * The optional "config" has the following optional parameters:
     * 1) title          - To change the title of the error modal
     * 2) size         - To change the size of the error modal
     * 3) closeHandler   - The method passed into this parameter will be called if the modal is closed via the "Confirm" button
     * 4) dismissHandler - The method passed into this parameter will be called if the modal is closed via the "Cancel" button, clicking on the "x", or by clicking on the backdrop
     */
    this.showConfirmMsg = function (confirmMsg, config) {
        if (!config) {
            config = {};
        }

        var confirmMsgModal = openConfirmModal(confirmMsg, config);

        confirmMsgModal.result.then(function () {
            if (config.closeHandler) {
                config.closeHandler();
            }
        }, function () {
            if (config.dismissHandler) {
                config.dismissHandler();
            }
        });
    };

    /*
     * Function to open an error message modal.
     *
     * The optional "config" has the following optional parameters:
     * 1) title          - To change the title of the error modal
     * 2) size         - To change the size of the error modal
     * 3) closeHandler   - The method passed into this parameter will be called if the modal is closed via the "ok" button
     * 4) dismissHandler - The method passed into this parameter will be called if the modal is closed via clicking on the "x" or by clicking on the backdrop
     */
    this.showErrorMsg = function (errMsg, config) {
        if (!config) {
            config = {};
        }

        var errorMsgModal = openErrorModal(errMsg, config);

        errorMsgModal.result.then(function () {
            if (config.closeHandler) {
                config.closeHandler();
            }
        }, function () {
            if (config.dismissHandler) {
                config.dismissHandler();
            }
        });
    };
});
