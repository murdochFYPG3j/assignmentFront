angular.module('was-public').service("ExamplesService", function ($q, $rootScope, Restangular) {
    this.upload = function(obj) {
        var fd = $rootScope.object2FormData(obj);

        return Restangular.one("examples/fileupload")
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(fd, '', undefined, {'Content-Type': undefined});
    };

});
