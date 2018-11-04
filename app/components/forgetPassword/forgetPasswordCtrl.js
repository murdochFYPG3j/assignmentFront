angular.module('was-admin').controller('forgetPasswordController', function ($scope, $rootScope, $state, $http, Constants, sweetAlert, forgetService) {
    'use strict';

    var ctrl = this;
    
    ctrl.submitEmail=function(){
        ctrl.checkEmail();
        if( !ctrl.resultEmail){
            sweetAlert.swal({
                customClass: 'swal2-side',
                type: 'success',
                text: 'Successful, Please check your email'});
        }else{
            sweetAlert.swal({
                customClass: 'swal2-side',
                text: 'Please enter correct email!',
                icon: "warning",
                type: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        var param={
            email:ctrl.email
        }
        var forgetPasswordPromise=forgetService.submitEmailForForgetPassword(param);
        
        /*forgetPasswordPromise.then(function (data) {
               ctrl.loading = false;


               //console.log("this is response" + JSON.stringify(data, null, 2));
               if (data.status === 'OK') {
                  
                    ctrl.reloadFunc();
                   sweetAlert.swal({
                       customClass: 'swal2-side',
                       type: 'success',
                       text: 'Please check your email'
                   }).then(function (response) {});
               } else {
                   ctrl.reloadFunc();
                   sweetAlert.swal({
                       customClass: 'swal2-side',
                       text: 'Unsuccess!',
                       icon: "warning",
                       type: "warning",
                       buttons: true,
                       dangerMode: true,
                   });
               }



           }
       */
    }
    ctrl.reloadFunc=function(){
        ctrl.email=null;
    }
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
        ctrl.resultEmail = true;
        ctrl.credentialDto = {
            responseCode: null,
            message: null,
            auth: false
        };
    }
    init();

});
