angular.module('was-admin').controller('registerController', function ($scope, $rootScope, $stateParams, $state, $filter, sweetAlert, RegisterService, $q) {
    'use strict';

    var ctrl = this;
    var initial = function () {
        ctrl.isFirst = true;
        ctrl.resultFirstName = false;
        ctrl.resultLastName = false;
        ctrl.resultEmail = false;
        ctrl.resultWeb = false;
        ctrl.resultReason = false;
        ctrl.resultFlag = false;
        /* var userType = RegisterService.getAllUserTypes();

       
         $q.all([nominationtypePromise]).then(function (data) {
            
             ctrl.userTypes = data[0];
                            });*/
        ctrl.userTypes = [{
                name: 'user'
                , code: 'USER'
            }
            , {
                name: 'admin'
                , code: 'ADMIN'
            }
            , {
                name: 'convener'
                , code: 'CONVENER'
            }];
    };
    initial();
    console.log("e",JSON.stringify(ctrl.userTypes, null, 2));

    var reloadFunc = function () {
        ctrl.name = '';
        ctrl.email = '';
        ctrl.url = '';
        ctrl.copyright = '';
        ctrl.reason = '';
        grecaptcha.reset();
    };
//for IE which doesnt support endswith function
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(searchString, position) {
            var subjectString = this.toString();
            if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
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
    
    ctrl.checkName = function () {
        //console.log("This is name" + ctrl.name + ":  " + (ctrl.name == null));
        if (ctrl.firstName == null) {
           
            ctrl.firstNameInvalid = true;
            ctrl.resultFirstName = true;
        } else {
            if (ctrl.firstName.length == 0) {
                ctrl.firstNameInvalid = true;
                ctrl.resultFirstName = true;

            }  else {
                ctrl.firstNameInvalid = false;
                ctrl.resultFirstName = false;
            }

        }
    };
    
    ctrl.checkLastName = function () {
        //console.log("This is name" + ctrl.name + ":  " + (ctrl.name == null));
        if (ctrl.lastName == null) {
            ctrl.lastNameInvalid = true;
            ctrl.resultLastName = true;
        } else {
            if (ctrl.lastName.length == 0) {
                ctrl.lastNameInvalid = true;
                ctrl.resultLastName = true;

            } else {
                ctrl.lastNameInvalid = false;
                ctrl.resultLastName = false;
            }

        }
    };
    
    ctrl.checkFirstPassword=function(){
        
        if(ctrl.password==null||ctrl.password.length==0){
            ctrl.firsPasswordInvalid=true;
        }else{
            ctrl.firsPasswordInvalid=false;
        }
    }
    ctrl.checkSecondPassword=function(){
        if(ctrl.secondPassword!==ctrl.password){
            ctrl.passwordNotEqual=true;
        }else{
            ctrl.passwordNotEqual=false;
        }
        if(ctrl.secondPassword==null||ctrl.secondPassword.length==0){
            ctrl.secondPasswordInvalid=true;
        }else{
            ctrl.secondPasswordInvalid=false;
        }
    }

   
   
    ctrl.checkFlag = function () {
        
        
            if (ctrl.userType == null || ctrl.userType == '') {
                ctrl.copyrightInvalid = true;
                ctrl.resultFlag = true;
            } else {
                ctrl.copyrightInvalid = false;
                ctrl.resultFlag = false;
            }
       
    };
    
    ctrl.checkSubmitNomination =function(){
        ctrl.checkEmail();
        ctrl.checkName();
        ctrl.checkLastName();
        ctrl.checkFirstPassword();
        ctrl.checkSecondPassword();
        ctrl.checkFlag();

        if(ctrl.copyrightInvalid==false&& ctrl.secondPasswordInvalid==false&& ctrl.passwordNotEqual==false &&ctrl.firsPasswordInvalid==false&&ctrl.lastNameInvalid==false
           &&ctrl.firstNameInvalid==false&&ctrl.resultEmail===false){
           
           
            ctrl.validateCaptcha();

          
        }else{
            sweetAlert.swal({
                customClass: 'swal2-side',
                text: "Please complete the nomination form ",
                icon: "warning",
                type: "warning",
                buttons: true,
                dangerMode: true,
            });
        }

        
    };
    ctrl.submitNomination = function () {

       
   
           var param = {
               
               email: ctrl.email,
               password:ctrl.password;
               role: ctrl.userType,
               first_name: ctrl.firstName,
               last_name: ctrl.lastName

           };
           //console.log('this i sParam data' + JSON.stringify(param, null, 2));
        var submitNomination = RegisterService.submiteNomination(param);

           /*submitNomination.swal({
            type: 'success',
            text: 'Thanks for submitting nomination form to NLB'
        }).then(function (response) {  
            ctrl.loading = false;
            ctrl.processAdditionalRole = false;
            $scope.msgOfError(response, $scope);

        });*/
           

           submitNomination.then(function (data) {
               ctrl.loading = false;
               

               //console.log("this is response" + JSON.stringify(data, null, 2));
               if (data.id === null) {
                   sweetAlert.swal({
                       customClass: 'swal2-side',
                       text: 'Unsuccess!',
                       icon: "warning",
                       type: "warning",
                       buttons: true,
                       dangerMode: true,
                   });
               } else {
                   reloadFunc();
                   sweetAlert.swal({
                       customClass: 'swal2-side',
                       type: 'success',
                       text: 'success'
                   }).then(function (response) {});
               }



           }, function (response) {
               ctrl.loading = false;
               ctrl.processAdditionalRole = false;
              // console.log("this is respose" + JSON.stringify(response, null, 2));


           });
       

  
    };


    ctrl.validateCaptcha = function () {
        
       // console.log('run validateCaptcha ');
        var params = {
            response: grecaptcha.getResponse()
        };

        //console.log("grecaptcha.getResponse(): "+grecaptcha.getResponse());
        var captchaFlag = RegisterService.verifyCaptcha(params);

        captchaFlag.then(function(success){

            //console.log("success: "+success);
            
            if (success) {
                
                ctrl.submitNomination();
            }
            else {
                grecaptcha.reset();
                
                sweetAlert.swal({
                    customClass: 'swal2-side',
                    text: "Captcha entered is incorrect, please try to validate again",
                    icon: "warning",
                    type: "warning",
                    buttons: true,
                    dangerMode: true,
                });
            }
            
        });        
    };
    
  
        });
