angular.module('was-admin').controller('createUserController', function ($scope, $rootScope, $stateParams, $uibModal, createUserService, PaginationService, $q, Constants, sweetAlert, MomentDateService, $window) {
    'use strict';
    var ctrl = this;
    ctrl.filteredList = [];

    function initial() {
        
        ctrl.selectedUserDetails=[];
        
        //ctrl.selectedUserDetails=ProfileService.getUserDetail(userID);
   //     console.log("Innital"+JSON.stringify(ctrl.nominations,null,2));
    }
    initial();
    
    ctrl.reset=function(){
        initial();
    }
    
    ctrl.createUser=function(){
        console.log('updaye');
        ctrl.updateEmail();
        if(!ctrl.resultEmail&&ctrl.selectedUserDetails.firstName.length>0
           &&ctrl.selectedUserDetails.lastName.length>0
           &&ctrl.selectedUserDetails.contactNo.length>0
           &&ctrl.selectedUserDetails.roleName.length>0){
           var param={
               first_name:ctrl.selectedUserDetails.firstName,
               last_name:ctrl.selectedUserDetails.lastName,
               email:ctrl.selectedUserDetails.userEmail,
               role:ctrl.selectedUserDetails.roleName,
               password:ctrl.selectedUserDetails.password
            };
           /* sweetAlert.swal({
                type: 'success',
                text: 'Successfully created'
            });*/
            var selectedUserDetailPromise=createUserService.createUser(param);
            selectedUserDetailPromise.then(function (data) {
                ctrl.loading = false;

                if (data.status == '200 OK') {
                    sweetAlert.swal({
                        type: 'success',
                        text: 'Successfully Changed'
                    });

                } else if (data.status == 'NO') {
                    sweetAlert.swal({
                        text: data.result,
                        icon: "warning",
                        type: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
            }, function (response) {});
            
        }else{
            sweetAlert.swal({
                text: 'Please fill in detail correctly',
                icon: "warning",
                type: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        
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