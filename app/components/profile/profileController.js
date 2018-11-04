angular.module('was-admin').controller('profileController', function ($scope, $rootScope, $stateParams, $uibModal, ProfileService, PaginationService, $q, Constants, sweetAlert, MomentDateService, $window) {
    'use strict';
    var ctrl = this;
    ctrl.filteredList = [];

    function initial() {
        ctrl.selectedUserDetails={firstName:'Test',
                                 lastName:'TestLast',
                                 userEmail:'email@c.com',
                                 loginId:'user',
                                  roleName:'User',
                                 contactNo:81888888};
        
        //ctrl.selectedUserDetails=ProfileService.getUserDetail(userID);
   //     console.log("Innital"+JSON.stringify(ctrl.nominations,null,2));
    }
    initial();
    
    ctrl.reset=function(){
        initial();
    }
    
    ctrl.updateUser=function(){
        if(ctrl.resultEmail){
           var param={
                firstName:ctrl.selectedUserDetails.firstName,
                lastName:ctrl.selectedUserDetails.lastName,
                userEmail:ctrl.selectedUserDetails.userEmail,
                roleName:ctrl.selectedUserDetails.roleName,
                contactNo:ctrl.selectedUserDetails.contactNo
            };
            //ctrl.selectedUserDetails=ProfileService.updateUserDetail(param);
            
        }else{}
        
    }
    
    ctrl.updateEmail = function () {
        //console.log("this is run ");

        if (ctrl.selectedUserDetails.userEmail == null) {
            ctrl.emailEmpty = true;
            ctrl.emailInvalid = false;
            ctrl.resultEmail = true;
        } else {
            if (ctrl.selectedUserDetails.userEmail.length == 0) {
                ctrl.emailEmpty = true;
                ctrl.emailInvalid = false;
                ctrl.resultEmail = true;
            } else {
                ctrl.emailEmpty = false;
                if (ctrl.selectedUserDetails.userEmail.match('@')) {
                    if (ctrl.selectedUserDetails.userEmail.endsWith('.')
                        ||ctrl.selectedUserDetails.userEmail.includes('@.')||
                        ctrl.selectedUserDetails.userEmail.endsWith('@')) {

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
})