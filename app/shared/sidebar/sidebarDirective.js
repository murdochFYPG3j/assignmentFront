angular.module('was-admin').directive('sidebar', ['$location', function () {
    'use strict';
    
    return {
        templateUrl: 'app/shared/sidebar/sidebarView.html',
        restrict: 'E',
        replace: true,
        scope: {},
        controller: function ($scope, $rootScope, $state, $location,sitemapService,sweetAlert) {
            $scope.$state = $state;
            $scope.generateSitemap = function () {
                sweetAlert.swal({
                    text: "Are you sure you want to generate sitemap?",
                    icon: "info",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "Generate",
                }).then(function(respoense){
                    console.log("show button"+JSON.stringify(respoense,null,2));
                    if(respoense.value===true){
                        sitemapService.generateSitemaps().then(function(data){
                            if (data.successFlag == 'YES') {
                                sweetAlert.swal({
                                    type: 'success',
                                    text: data.result
                                });

                            }else{

                                sweetAlert.swal({
                                    text: data.result,
                                    icon: "warning",
                                    type: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                });
                            }
                        });
                    }
                });
               
            };    
        }
    };
}]);