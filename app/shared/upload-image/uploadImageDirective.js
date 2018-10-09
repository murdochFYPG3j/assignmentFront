// Angular File Upload module does not include this directive
// Only for example
// https://github.com/nervgh/angular-file-upload/wiki/Module-API

/**
 * The ng-thumb directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 */
angular.module('was-admin').directive('uploadImageWithPreview', ['$window', function () {

    return {
        templateUrl: 'app/shared/upload-image/uploadImageView.html',
        restrict: 'E',
        replace: true,
        scope: {
            imgList: '=', // {Object}: content of {id:id, imagePath:imagePath, size:size, name:name, description:discription}
            isSpecialcollection:'=',//{boolean}: return true, if it is for specialCollection
            isDisabledUpload:'=', // //{boolean}: return true, if image upload is disabled
            showUploadBtn: '@', // {Boolean}: default true,
            hint: '@',
            uploadUrl: '@', //url {String}: Path on the server to upload files
            isMultipleUpload: '@', //{boolean}: default false, only single file select by default
            previewImgHeight: '@imgHeight',
            previewImgWidth: '@imgWidth',
            getFileInfoFunc: '&', //{function}, example: getFileInfoFunc(file), param naming must be 'file'
            onUploadSuccessFunc: '&',
            onUploadErrorFunc: '&',
            onRemoveFunc: '&',
            onCompleteItemFunc: '&'
        },
        controller: function ($scope, $rootScope, $state, $location, $window, $cookies, FileUploader, Constants) {

            $scope.previewImgHeight = $scope.previewImgHeight ? $scope.previewImgHeight : 582;
            $scope.previewImgWidth = $scope.previewImgWidth ? $scope.previewImgWidth : 284;
            $scope.isMultipleUpload = $scope.isMultipleUpload === true ? true : false;
            $scope.showUploadBtn = $scope.showUploadBtn === false ? false : true;
            
            if($scope.isSpecialcollection && $scope.isSpecialcollection==true){
                $scope.isAnother=false;
            }else{
                $scope.isAnother=true;
            }

           // console.log("uploader -- "+JSON.stringify($scope.imgList, null, 2));
            var uploader = $scope.uploader = new FileUploader({
                url: Constants.BASE_URL + '/' + $scope.uploadUrl //url {String}: Path on the server to upload files                
            });

            if ($window.sessionStorage.token) {
                uploader.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            var csrfToken = $cookies.get('XSRF-TOKEN');
           // console.info("csrfToken : " + csrfToken);

            if (!!csrfToken) {
                uploader.headers['X-CSRF-TOKEN'] = csrfToken;
                uploader.headers['X-XSRF-TOKEN'] = csrfToken;
            }

            $scope.$watch('imgList', function (newVal, oldVal) {
                if ((newVal && oldVal != newVal) || (newVal && !$scope.preLoadImgList)) {
                    $scope.preLoadImgList = newVal;
                    var fileItems = [];
                    uploader.queue = [];
                    //console.log("newVal" + JSON.stringify(newVal, null, 2));

                    angular.forEach(newVal, function (value, key) {
                        //console.log("value.imagePath : " + value.imagePath);
                        var loadPromise = loadXHR(value.imagePath);
                        loadPromise.then(function (blob) {
                            // here the image is a blob
                            var fileItem = new FileUploader.FileItem(uploader, {
                                id: value.id,
                                dateModified: new Date(),
                                size: value.size,
                                type: "image/jpeg",
                                name: value.name,
                                description: value.description
                            });
                            fileItem._file = new File([blob], value.name, {
                                id: value.id,
                                dateModified: new Date(),
                                size: value.size,
                                type: "image/jpeg",
                                name: value.name,
                                description: value.description
                            });
                            fileItem.formData = {
                                id: value.id,
                                description: value.description,
                                name: value.name,
                                size: value.size
                            };

                            fileItem.progress = 100;
                            fileItem.isUploaded = true;
                            fileItem.isSuccess = true;

                            fileItems.push(fileItem);
                            uploader.queue.push(fileItem);
                            uploader.onAfterAddingFile(fileItem);
                        });


                        loadPromise.catch(function (error) {
                           // console.log("returnResult" + JSON.stringify(error, null, 2));

                            var fileItem = new FileUploader.FileItem(uploader, {
                                id: value.id,
                                dateModified: new Date(),
                                size: value.size,
                                type: "image/jpeg",
                                name: value.name,
                                description: value.description
                            });

                            fileItem.formData = {
                                id: value.id,
                                description: value.description,
                                name: value.name,
                                size: value.size
                            };

                            fileItem.progress = 100;
                            fileItem.isUploaded = true;
                            fileItem.isSuccess = true;

                            fileItems.push(fileItem);
                            uploader.queue.push(fileItem);
                            uploader.onAfterAddingFile(fileItem);
                        });
                    });

                    uploader.onAfterAddingAll(fileItems);
                    uploader._render();
                }
            });

            // FILTERS

            uploader.filters.push({
                name: 'imageFilter',
                fn: function (item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });


            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/ , filter, options) {
               // console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {

               /* console.info('onAfterAddingFile', fileItem);
                console.info('onAfterAddingFile - uploader.queue', uploader.queue);*/
            };

            uploader.onBeforeUploadItem = function (item) {

                var fileInfo = $scope.getFileInfoFunc({
                    file: item.file
                });

                //console.log("fileInfo - " + JSON.stringify(fileInfo, null, 2));
                if (!fileInfo) {
                    fileInfo = {};
                }
               // console.log("fileInfo" + JSON.stringify(fileInfo, null, 2));
                var fd = $rootScope.object2FormData(fileInfo);
                item.formData.push(fd);

                if (!!csrfToken) {
                    item.withCredentials = true;
                }

            };
            uploader.onProgressItem = function (fileItem, progress) {
                //console.info('onProgressItem', fileItem, progress);
            };

            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                if (fileItem.isUploaded === true && fileItem.isSuccess === true) {
                    if ($scope.onUploadSuccessFunc !== undefined) {
                     //   console.log("this is from directive! sucess");
                        $scope.onUploadSuccessFunc({
                            response: response
                        });
                    }
                } else {
                    if ($scope.onUploadErrorFunc !== undefined) {
                        $scope.onUploadErrorFunc({
                            response: response
                        });
                    }
                }

               // console.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {
                if ($scope.onUploadErrorFunc !== undefined) {
                    $scope.onUploadErrorFunc({
                        response: response
                    });
                }
               // console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
               // console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
              //  console.info('onCompleteItem', fileItem, response, status, headers);
                if ($scope.onCompleteItemFunc !== undefined) {
                    $scope.onCompleteItemFunc({
                        response: response,
                        file:fileItem
                    });
                }
            };

            $scope.removeItemFunc = function (fileItem) {
              ///  console.info('removeItemFunc', fileItem.formData);
                if (fileItem.formData && fileItem.formData.id) {
                    if ($scope.onRemoveFunc !== undefined) {
                        $scope.onRemoveFunc({
                            file: fileItem
                        });
                    }
                } else {
                    fileItem.remove();
                }
            };

            ///console.info('uploader', uploader);

            function loadXHR(url) {

                return new Promise(function (resolve, reject) {
                    try {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url);
                        xhr.responseType = "blob";
                        xhr.onerror = function () {
                            reject("Network error.");
                        };
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                resolve(xhr.response);
                            } else {
                                reject("Loading error:" + xhr.statusText);
                            }
                        };
                        xhr.send();
                    } catch (err) {
                        reject(err.message);
                    }
                });
            }
        }
    };
}]);

/*
angular.module('was-admin').directive('uploadImageWithoutPreview', ['$window', function () {
    return {
        templateUrl: 'app/shared/upload-image/uploadImageView.html',
        restrict: 'E',
        replace: true,
        scope: {},
        controller: function ($scope, $rootScope, $state, $location) {
            $scope.$state = $state;

        }
    }
}]);
*/

angular.module('was-admin').directive('ngThumb', ['$window', function ($window, $scope) {
 
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };
   
    return {
      
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
              /*  console.info("param width", params.width);
                console.info("this width", this.width);
                console.info("param height", params.height);
                console.info("this height", this.height);*/
               
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                
                if(params.actualRatio==true){
                    var actualRatio=1.85;
                    var ratio=this.width/this.height;
                    this.height=100;
                    this.width= this.height*ratio;

                     width = this.width;
                     height = this.height;
                }
                
                
               
             /*   console.info("final width", width);
                console.info("final height", height);
*/
                canvas.attr({
                    width: width,
                    height: height,
                   
                    


                });



                canvas[0].getContext('2d').drawImage(this, 0, 0,width, height);
            }
        }
    };
}]);


