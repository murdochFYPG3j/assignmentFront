angular.module('was-admin').controller('LoginController', function ($scope, $rootScope, $state, $http, Constants, sweetAlert, LoginService,$window,$q) {
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
          /*  console.log("this is login "+credential.password+credential.email);
            if(credential.email=='user@gmail.com'&&credential.password=='password'){
                $rootScope.username='zhangqiang';
                $rootScope.userEmail='user@gmail.com';
                sessionStorage.setItem('userId',100);
                sessionStorage.setItem('userEmail','user@gmail.com');
                sessionStorage.setItem('userName','zhangqiang');
                sessionStorage.setItem('userRole','user');
                
                console.log("Success");*/
              
                LoginService.login(credential).then(function (result) {
                console.info("result", result);

                    if (result.access_token) {
                        sessionStorage.setItem('access_token',result.access_token);
                        var personDetail=LoginService.getPersonDetail();
                        $q.all([personDetail]).then(function (data) {
                            $rootScope.username=data.firstName +' '+data.lastName;
                            $rootScope.userEmail=data.email;
                            sessionStorage.setItem('userId',data.id);
                            sessionStorage.setItem('userEmail',data.email);
                            sessionStorage.setItem('userName',data.firstName +' '+data.lastName);
                            sessionStorage.setItem('userRole',data.role);
                    
                            $state.go('landing.view');

                        });

                    



                } else {
                    ctrl.credentialDto = 'Incorrect user email/password';
                }
            });
               // $rootScope.selectedRoleCode='user';
                if($rootScope.selectedRoleCode==='user'){
                    $state.go('appointment.list');
                }else{
                    $state.go('landing.view');
                }
               
                
           /* }else{
                console.log('run');
                ctrl.credentialDto=[];
                ctrl.credentialDto.reason ='Wrong password, user name is user@gmail.com, password is password';
            }*/
        
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
