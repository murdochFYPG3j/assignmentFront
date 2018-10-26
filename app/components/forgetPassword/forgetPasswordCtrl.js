angular.module('was-admin').controller('forgetPasswordController', function ($scope, $rootScope, $state, $http, Constants, sweetAlert, LoginService) {
    'use strict';

    var ctrl = this;
    

    ctrl.checkEmail = function () {
        //console.log("this is run ");

        if (ctrl.email == null) {
            ctrl.emailEmpty = true;
            ctrl.emailInvalid = false;
            ctrl.resultEmail = true;
        } else {
            if (ctrl.email.length == 0) {
                ctrl.emailEmpty = true;
                ctrl.emailInvalid = false;
                ctrl.resultEmail = true;
            } else {
                ctrl.emailEmpty = false;
                if (ctrl.email.match('@')) {
                    if (ctrl.email.endsWith('.')||ctrl.email.includes('@.')||ctrl.email.endsWith('@')) {

                        ctrl.emailInvalid = true;
                        ctrl.resultEmail = true;

                    } else {
                        ctrl.emailInvalid = false;
                        ctrl.resultEmail = false;
                    }


                } else {

                    ctrl.resultEmail = true;
                    ctrl.emailInvalid = true;
                }




            }
        }
    };
    
    function init() {
        ctrl.credentialDto = {
            responseCode: null,
            message: null,
            auth: false
        };
    }

});
