var routes = [
    /* Examples */
    {
        name: 'examples',
        url: '/examples',
        controller: 'ExamplesController',
        templateUrl: 'app/shared/templateView.html',
        resolve: {
            loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        'app/components/examples/examplesController.js',
                        'app/components/examples/examplesService.js',
                    ]
                });
            }
        }
    }, {
        name: 'examples.form',
        url: '/form',
        controller: 'ExamplesController',
        templateUrl: 'app/components/examples/examplesFormView.html'
    }, {
        name: 'examples.table',
        url: '/table',
        controller: 'ExamplesController',
        views: {
            'tab-level-1': {
                templateUrl: 'app/components/examples/examplesTableView.html'
            }
        }
    },
    /* Dashboard */
    {
        name: 'landing',
        url: '/landing',
        templateUrl: 'app/shared/templateView.html', 
    },
    {
        name: 'landing.view',
        url: '/view',
        controller: 'DashboardController',
        controllerAs:'ctrl',
        templateUrl: 'app/components/dashboard/dashboardView.html',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [             
                        'app/components/dashboard/dashboardController.js',
                        'app/components/dashboard/dashboardService.js'
                    ]
                });
            }
        }
    },
    {
        name: 'standBy',
        url: '/stand-by',
        templateUrl: 'app/shared/standbyView.html', 
    },
    {
        name: 'appointment',
        url: '/appointment',
        templateUrl: 'app/shared/templateView.html',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [                        
                        'app/components/appointment/appointmentService.js'
                    ]
                });
            }
        }
    },
    {
        name: 'appointment.list',
        url: '/list',
        controller: 'AppointmentListController',
        controllerAs:'ctrl',
        templateUrl: 'app/components/appointment/appointmentList.html',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [                        
                        'app/components/appointment/appointmentList.js',
                        'app/components/appointment/appointmentDetailController.js',
                        'app/shared/confirmation/confirmationController.js',
                        'app/shared/common-services/MomentDateService.js'
                        
                    ]
                });
            }
        }
    },
    {
        name: 'appointment.create',
        url: '/create',
        controller: 'appointmentCreateController',
        controllerAs:'ctrl',
        templateUrl: 'app/components/appointment/create/appointmentCreateView.html',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [                        
                        'app/components/appointment/create/appointmentCreateController.js',
                        'app/components/appointment/appointmentService.js'
                        
                    ]
                });
            }
        }
    },
    {
        name: 'appointment.detail',
        url: '/detail/{webID}',
        controller: 'AppointmentDetailController',
        controllerAs:'ctrl',
        templateUrl: 'app/components/appointment/appointmentDetailView.html',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [                        
                        'app/components/appointment/appointmentDetailController.js',
                        'app/components/appointment/appointmentService.js',
                        'app/shared/common-services/MomentDateService.js',
                        
                    ]
                });
            }
        }
    },
    {
        name: 'profile',
        url: '/profile',
        templateUrl: 'app/shared/templateView.html',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [                        
                        'app/components/profile/profileService.js'
                    ]
                });
            }
        }
    },
    {
        name: 'profile.list',
        url: '/list',
        templateUrl: 'app/components/profile/profileView.html',
        controller: 'profileController',
        controllerAs:'ctrl',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [                        
                        'app/components/profile/profileController.js',
                        
                        'app/components/profile/modal/profileService',
                        'app/shared/common-services/MomentDateService.js'
                    ]
                });
            }
        }
    },
     {
        name: 'login',
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/shared/login/loginView.html',
        resolve: {
            loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        'app/shared/login/loginCtrl.js',
                        'app/shared/login/loginService.js'     
                    ]
                });
            }
        }
    }, {
        name: 'appointmentManage',
        url: '/appointmentManage',
        templateUrl: 'app/shared/templateView.html',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [                        
                        'app/components/appointmentManage/appointmentManageService.js'
                    ]
                });
            }
        }
    }, {
        name: 'appointmentManage.list',
        url: '/list',
        templateUrl: 'app/components/appointmentManage/appointmentManageView.html',
        controller: 'appointmentManageController',
        controllerAs:'ctrl',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [             
                        'app/components/appointmentManage/appointmentManageController.js'
                    ]
                });
            }
        }
    },  {
        name: 'userManagement',
        url: '/userManagement',
        templateUrl: 'app/shared/templateView.html',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [                        
                        'app/components/user-management/userManagementService.js'
                    ]
                });
            }
        }
    }, {
        name: 'userManagement.list',
        url: '/management',
        templateUrl: 'app/components/user-management/userManagementView.html',
        controller: 'RoleManagementController',
        controllerAs:'ctrl',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [             
                        'app/components/user-management/userManagementController.js',
                        'app/shared/confirmation/confirmationController.js',
                        'app/components/user-management/userManagementService.js'                        
                    ]
                });
            }
        }
    },{
        name: 'register',
        url: '/register',
        templateUrl: 'app/components/register/registerView.html',
        controller: 'registerController',
        controllerAs:'ctrl',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'was-admin',
                    files: [             
                        'app/components/register/registerController.js',
                        'app/components/register/registerService.js'                        
                    ]
                });
            }
        }
    } 
];
