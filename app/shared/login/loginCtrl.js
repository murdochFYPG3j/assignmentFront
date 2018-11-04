angular.module('was-admin').controller('LoginController', function ($scope, $rootScope, $state, $http, Constants, sweetAlert, LoginService) {
    'use strict';

    var ctrl = this;
    
   /* if(Constants.env === 'staging' || Constants.env === 'production'){
        var req = {
            method: 'GET',
            url: Constants.BASE_URL + "/login",
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        $http(req).then(function(data){
            console.info("data", data);
        });  
    }     */
    
    ctrl.login = function () {
        if (validateEmptyCredential()) {
            var credential = {
                password: ctrl.password,
                email: ctrl.username
            };
            console.log("this is login "+credential.password+credential.email);
            if(credential.email=='user@gmail.com'&&credential.password=='password'){
                $rootScope.username='zhangqiang';
                $rootScope.userEmail='user@gmail.com';
                console.log("Success");
               //var role=[];
                /*LoginService.login(credential).then(function (result) {
                console.info("result", result);

            if (result.access_token) {

                    $state.go('landing.view');



                } else {
                    ctrl.credentialDto = result;
                }
            });*/
                $rootScope.selectedRoleCode='user';
                $state.go('landing.view');
                
            }else{
                console.log('run');
                ctrl.credentialDto=[];
                ctrl.credentialDto.reason ='Wrong password, user name is user@gmail.com, password is password';
            }
        
        }else{
            ctrl.credentialDto.reason ='please enter correct user name and password';
        }
    }; 
    ctrl.redirect=function(param){
        if(param=='register'){
            $state.go('register');
        }else{
            $state.go('forget-password');
        }
    }
    function validateEmptyCredential() {
        if (ctrl.loginForm.$valid)
            return true;

        return false;
    }

    
    function init() {
        ctrl.credentialDto = {
            responseCode: null,
            message: null,
            auth: false
        };
    }

});
