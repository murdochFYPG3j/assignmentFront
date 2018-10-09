angular.module('was-public').controller('ExamplesController', function($scope, $rootScope, $stateParams, ExamplesService) {

    'use strict';

    $scope.myFileUploadForm = {
        name: "My Form Name",
        description: "My Form Description",
        tags: ["tag1","tag2"],
        attachments: [{id:1, description:"File Description 1", date:"2017-05-01"}, {id:2, description:"File Description 2", date:"2017-05-01"}]
    };

    $scope.addFile = function() {
        var id = $scope.myFileUploadForm.attachments.length + 1;
        $scope.myFileUploadForm.attachments.push({
            id: id,
            description: "File Description " + id,
            date: "2017-05-01"
        });
    };

    $scope.submitFileUploadForm = function() {
        ExamplesService.upload($scope.myFileUploadForm);
    };


});