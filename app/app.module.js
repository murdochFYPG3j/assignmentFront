var app = angular.module('was-admin', [
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'ui.mask',
        'oc.lazyLoad',
        /*'angular-loading-bar',*/
        'restangular',
        'smart-table',
        'toggle-switch',
        'ngAnimate',
        'ngSanitize',
        '19degrees.ngSweetAlert2',
        'angularFileUpload',
        'ui.tinymce',
        'datePicker'
        ]);

app.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, $qProvider, RestangularProvider, Constants, $animateProvider ) {
    'use strict';

   

    RestangularProvider.setBaseUrl(Constants.BASE_URL);

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: Constants.DEBUG_MODE,
        events: true
    });
    $urlRouterProvider.otherwise('/login');
   
    $animateProvider.classNameFilter(/^(?:(?!no-animation).)*$/);

    angular.forEach(routes, function (state) {
        $stateProvider.state(state);
    });

    $qProvider.errorOnUnhandledRejections(false);

    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

    $httpProvider.interceptors.push(function ($q, $rootScope, $window, $cookies) {

       
            return {
                'request': function(config) {
                    var toaken1=$window.sessionStorage.getItem('access_token');
                    var toaken2=$window.sessionStorage.access_token;
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.getItem('access_token');
                    return config;
                }
            };
        
    });

});

app.run(function ($rootScope, $state, $http, $cookies, $stateParams, sweetAlert) {
    'use strict';

    $http.defaults.transformResponse.unshift(function (data, headers) {
        var csrfToken = $cookies.get('XSRF-TOKEN');
        console.info("csrfToken : " + csrfToken);
        
        if (!!csrfToken) {
            $http.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
        }

        return data;
    });
    

    // To allow usage of underscore js library in views
    $rootScope._ = _;

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        console.info('toState', toState);

        if (toState.url.includes('special')) {
            $rootScope.selectedModule = 'SPECIAL_COLLECTION';
        } else if (toState.url.includes('nomination')) {
            $rootScope.selectedModule = 'NOMINATION';
        } else if (toState.url.includes('role')) {
            $rootScope.selectedModule = 'ROLE_MGMT';
        } else if (toState.url.includes('content')) {
            $rootScope.selectedModule = 'CONTENT_MGMT';
        } else if (toState.url.includes('report')) {
            $rootScope.selectedModule = 'REPORT';
        } else if (toState.url.includes('create')) {}

        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });


    $rootScope.object2FormData = function (obj, fd) {
        //        console.log(JSON.stringify(obj, null, 4));
        if (!fd) {
            fd = new FormData();
        }

        var parseObjectForFiles = function (obj, fd) {
            if (angular.isArray(obj)) {
                angular.forEach(obj, function (val, key) {
                    parseObjectForFiles(val, fd);
                });
            } else if (angular.isObject(obj)) {
                angular.forEach(obj, function (val, key) {
                    if (val instanceof FileList) {
                        angular.forEach(val, function (val1, key1) {
                            //                            console.log(key);
                            fd.append(key, val1);
                        });
                    } else {
                        parseObjectForFiles(val, fd);
                    }
                });
            }
        };

        parseObjectForFiles(obj, fd);

        fd.append("json", new Blob([JSON.stringify(obj)], {
            type: "application/json"
        }));

        return fd;
    };



    $rootScope.$on('$stateChangeError', function (event, toState) {
        sweetAlert.swal({
            type: 'warning',
            text: 'Currently the module is not available yet 1'
        }).then(function (response) {
            $state.go("landing");
        });
    });

    $rootScope.exportFile = function (data, dataType, fileName) {
        var blob = new Blob([data], {
            type: dataType
        });


        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {

            var url = window.URL || window.webkitURL;
            var fileURL = url.createObjectURL(blob);
            var downloadLink = angular.element('<a></a>');
            downloadLink.attr('href', fileURL);
            downloadLink.attr('download', fileName);
            document.body.appendChild(downloadLink[0]);
            downloadLink[0].click();
            setTimeout(function () {
                document.body.removeChild(downloadLink[0]);
                url.revokeObjectURL(fileURL);
            }, 100);


        }


    };

});
