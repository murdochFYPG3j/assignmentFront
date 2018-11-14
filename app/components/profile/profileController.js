angular.module('was-admin').controller('profileController', function ($scope, $rootScope, $stateParams, $uibModal, ProfileService, PaginationService, $q, Constants, sweetAlert, MomentDateService, $window) {
    'use strict';
    var ctrl = this;
    ctrl.filteredList = [];

    function initial() {
        
       /* ctrl.selectedUserDetails={firstName:'Test',
                                 lastName:'TestLast',
                                 userEmail:'email@c.com',
                                 loginId:'user',
                                  roleName:'User',
                                 contactNo:81888888};*/
        
        ctrl.selectedUserDetails={firstName:null,
                                  lastName:null,
                                  email:null,
                                  role:null,
                                  contactNo:null,
                                  id:null};
          
        ctrl.selectedUserDetails.firstName= $window.sessionStorage.getItem("firstName");
        ctrl.selectedUserDetails.lastName= $window.sessionStorage.getItem("lastName");
        ctrl.selectedUserDetails.userEmail= $window.sessionStorage.getItem("userEmail");
        ctrl.selectedUserDetails.roleName= $window.sessionStorage.getItem("userRole");
        ctrl.selectedUserDetails.contactNo=87653864;
        ctrl.selectedUserDetails.id= $window.sessionStorage.getItem("userId");

   //     console.log("Innital"+JSON.stringify(ctrl.nominations,null,2));
    }
    initial();
    
    ctrl.reset=function(){
        initial();
    }
    
    ctrl.updateUser=function(){
        console.log('updaye');
        ctrl.updateEmail();
        if(!ctrl.resultEmail){
           var param={
               first_name:ctrl.selectedUserDetails.firstName,
               last_name:ctrl.selectedUserDetails.lastName,
               email:ctrl.selectedUserDetails.userEmail,
               role:ctrl.selectedUserDetails.roleName,
               id:ctrl.selectedUserDetails.id/*,
                contactNo:ctrl.selectedUserDetails.contactNo*/
            };
          /*  sweetAlert.swal({
                type: 'success',
                text: 'Successfully Changed'
            });*/
           var selectedUserDetailPromise=ProfileService.updateUserDetail(param);
            selectedUserDetailPromise.then(function (data) {
                ctrl.loading = false;

                if (data.id !=null) {
                    sweetAlert.swal({
                        type: 'success',
                        text: 'Successfully Changed'
                    });

                } else  {
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