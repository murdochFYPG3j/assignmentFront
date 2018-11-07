'use strict';
app.directive('vwFileUpload', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        scope: {
            ngModel: '=',
            maxFileCount: '=',
            extractFilename: '=',
            extractFilenameWithoutExtensions: '=',
            extractFilesize: '=',
            showPreview: '=',
            showCaption: '=',
            showRemove: '=',
            imagePreviewWidth: '=',
            imagePreviewHeight: '=',
            maxFileSize: '=',
            allowedFileExtensions: '=',
            fileError: '=',
        },
        link: function (scope, element, attrs) {
            $(element).fileinput({
                showPreview: scope.showPreview || false,
                elErrorContainer: '#' + scope.fileError|| "#errorBlock",
                showUpload: false,
                showRemove: scope.showRemove,
                maxFileCount: scope.maxFileCount || 0,
                showCaption: scope.showCaption,
                previewSettings: {
                    image: {
                        width: scope.imagePreviewWidth + "px",
                        height: scope.imagePreviewHeight + "px"
                    }
                },
                maxFileSize: scope.maxFileSize,
                allowedFileExtensions: scope.allowedFileExtensions,
                msgSizeTooLarge: "File {name} (<b>{customSize}</b>) exceeds maximum allowed upload size of <b>{customMaxSize}</b>.",
            });
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.ngModel = changeEvent.target.files;
                    if (attrs.extractFilename) {
                        scope.extractFilename = $(element).val().replace(/^.*[\\\/]/, '');
                    };

                    if (attrs.extractFilenameWithoutExtensions) {
                        scope.extractFilenameWithoutExtensions = $(element).val().replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");
                    };
                    if (attrs.extractFilesize) {
                        var files = changeEvent.target.files
                        var h = 0;
                        var fSExt = ['Bytes', 'KB', 'MB', 'GB'];
                        for (; h < files.length; h++) {
                            var _size = files[h].size;
                            var i = parseInt(Math.floor(Math.log(_size) / Math.log(1024)));
                            var exactSize = parseFloat((_size / Math.pow(1024, i)).toFixed(2)) + ' ' + fSExt[i];
                            scope.extractFilesize = exactSize;
                        };
                    };
                });
            });
            element.bind("fileerror", function(event, data, msg){
                var formatSize = function(s) {
                    console.log("s : " + s);
                    var i = Math.floor(Math.log(s) / Math.log(1024));
                    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                    var out = (s / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
                    return out;
                };
                var fileErrorSize = formatSize(data.file.size);
                var maxSize = $(this).data().fileinput.maxFileSize;
                var styleElement = angular.element(document).find('#' + scope.fileError);
                if(data.file.size > maxSize * 1024){

                    var customFileSizeMsg = angular.element(document).find('.file-error-message');
                    msg = msg.replace('{customSize}', fileErrorSize);
                    msg = msg.replace('{customMaxSize}', formatSize(maxSize * 1024));
                    customFileSizeMsg.html(msg);
                }
                styleElement.append(msg);
                styleElement.addClass('alert alert-block alert-danger help-block');
            });
            element.bind('fileclear', function(event) {
                var styleElement = angular.element(document).find('#' + scope.fileError);
                styleElement.empty();
                styleElement.removeClass(); 
            });
        }
    };
}]);