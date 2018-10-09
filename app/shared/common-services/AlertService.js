angular.module('was-admin').service("AlertService", function (sweetAlert) {

    this.warningAlert = function (alertMsg, showCancelButton, onConfirmFunc) {
        if (showCancelButton !== true) {
            showCancelButton = false;
        }
        sweetAlert.swal({
            type: 'warning',
            text: alertMsg,
            showCancelButton: showCancelButton
        }).then(function (response) {
            console.log(JSON.stringify(response)+" _ ");
            if (response.value === true) {
                console.log('im here');
                if (onConfirmFunc !== undefined) {
                    console.log('onConfirmFunc called');
                    onConfirmFunc();
                }
            }
        });
    };

    this.errorAlert = function (alertMsg, showCancelButton, onConfirmFunc) {
        if (showCancelButton !== true) {
            showCancelButton = false;
        }
        sweetAlert.swal({
            type: 'error',
            text: alertMsg,
            showCancelButton: showCancelButton
        }).then(function (response) {
            if (response.value === true) {
                if (onConfirmFunc !== undefined) {
                    onConfirmFunc();
                }
            }
        });
    };

    this.successAlert = function (alertMsg, showCancelButton, onConfirmFunc) {
        if (showCancelButton !== true) {
            showCancelButton = false;
        }
        sweetAlert.swal({
            type: 'success',
            text: alertMsg
        }).then(function (response, title) {
            if (response.value === true) {
                if (onConfirmFunc !== undefined) {
                    onConfirmFunc();
                }
            }
        });
    };

    this.infoAlert = function (alertMsg, showCancelButton, onConfirmFunc) {
        if (showCancelButton !== true) {
            showCancelButton = false;
        }
        sweetAlert.swal({
            type: 'info',
            text: alertMsg
        }).then(function (response) {
            if (response.value === true) {
                if (onConfirmFunc !== undefined) {
                    onConfirmFunc();
                }
            }
        });
    };

});
