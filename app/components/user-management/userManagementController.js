angular.module('was-admin').controller('RoleManagementController', function ($scope, $rootScope, $state, $q, $uibModal, RoleManagementService,sweetAlert, LoginService) {
    'use strict';

    var ctrl = this;
    ctrl.initial=function(){
        ctrl.users=[{id:1,
                    name:'user1',
                    email:'test@.email',
                    contact:81260314},
                    {id:2,
                     name:'user2',
                     email:'test2@.email',
                     contact:81260314},
                    {id:3,
                     name:'user3',
                     email:'test3@.email',
                     contact:81260314}];
    };
    ctrl.initial();

});
