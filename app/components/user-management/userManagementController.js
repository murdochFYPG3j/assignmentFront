angular.module('was-admin').controller('RoleManagementController', function ($scope, $rootScope, $state, $q, $uibModal, UserManagementService,sweetAlert, LoginService) {
    'use strict';

    var ctrl = this;
    ctrl.initial=function(){
        
        var getAllUserPromise=UserManagementService.getAllUser();
        $q.all([getAllUserPromise]).then(function (data) {

            ctrl.users = data;



        });
       /* ctrl.users=[{id:1,
                     firstName:'user1',
                     lastName:'lastName',
                    email:'test@.email',
                     role:'user',
                    contact:81260314},
                    {id:2,
                     firstName:'user2',
                     role:'admin',
                     lastName:'lastName',
                     email:'test2@.email',
                     contact:81260314},
                    {id:3,
                     firstName:'user3',
                     lastName:'lastName',
                     role:'admin',
                     email:'test3@.email',
                     contact:81260314}];
    };*/
    ctrl.initial();
    ctrl.showUserDetail=function(user){
        ctrl.selecteduser=user;
    }
    
    ctrl.updateUser=function(){
        var param={
           
            userEmail:ctrl.selecteduser.email,
            first_name:ctrl.selecteduser.first_name,
            last_name:ctrl.selecteduser.last_name,
            role:ctrl.selecteduser.role/*,
            contactNo:ctrl.selecteduser.contact*/
        };
        var id=ctrl.selecteduser.id;
        var updateUser=UserManagementService.updateUser(id,param)
        sweetAlert.swal({
            type: 'success',
            text: 'Successfully Changed'
        });
    }

});
