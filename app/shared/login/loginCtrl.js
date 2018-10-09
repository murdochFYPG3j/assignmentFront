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
                username: ctrl.username
            };
            console.log("this is login "+credential.password+credential.username);
            if(credential.username=='user'&&credential.password=='password'){
                $rootScope.username='zhangqiang';
                $rootScope.selectedRole=[];
                $rootScope.selectedRole.push({name:'user',
                                        code:'user'})
                $state.go('landing.view');
                
            }else{
                console.log('run');
                ctrl.credentialDto=[];
                ctrl.credentialDto.reason ='Wrong password, user name is user, password is password';
            }
          /*  LoginService.login(credential).then(function (result) {
                console.info("result", result);

                if (result.auth && result.status === Constants.AUTHENTICATED) {

                    $state.go('landing.view');
                    
                  
                    
                } else {
                    ctrl.credentialDto = result;
                }
            });*/
        }
    }; 

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
