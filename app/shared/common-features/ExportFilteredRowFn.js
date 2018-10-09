angular.module('was-admin').directive('exportFilteredRowFn', function (sweetAlert) {
    return {
        restrict: "E",
        scope: {
            filename: "@",
            method: '&'
        },
        template: '<button class="btn btn-outline-success my-2 my-sm-0" type="button"><i class="fa fa-download"></i> Export Filtered</button> ',
        replace: true,
        link: function (scope, elem) {
            $(elem).click(function (e, rowid) {
                var resultPromise = scope.method();
                if (resultPromise) {
                    resultPromise.then(function (data) {
                        exportFile(data, 'text/csv', scope.filename);
                    });
                }
            });

            function exportFile(data, dataType, fileName) {
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
            }
        }
    };
});
