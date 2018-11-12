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
                            console.info("result", JSON.stringify(data[0], null, 2));
                            $rootScope.username=data[0].first_name +' '+data[0].last_name;
                            $rootScope.userEmail=data[0].email;
                            $rootScope.selectedRoleCode=data[0].role;
                            sessionStorage.setItem('userId',data[0].id);
                            sessionStorage.setItem('userEmail',data[0].email);
                            sessionStorage.setItem('userName',data[0].first_name +' '+data[0].last_name);
                            sessionStorage.setItem('userRole',data[0].role);
                            console.info("result"+$rootScope.username);
                           // $state.go('landing.view');
                            if($rootScope.selectedRoleCode==='attendee'){
                                $state.go('appointment.list');
                            }else{
                                $state.go('landing.view');
                            }

                        });

                    



                } else {
                    ctrl.credentialDto = 'Incorrect user email/password';
                }
            });
               // $rootScope.selectedRoleCode='user';
               
               
                
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
