angular.module('was-admin').service("SpecialCollectionService", function ($q, $rootScope, Restangular) {
    var prefix = "api/v1/special-collection";

/*    this.updateSpecialCollection = function (params) {
        return Restangular.all(prefix + '/update-special-collection').post(params);
    };*/

    this.submitSpecialCollection = function (params) {
        return Restangular.all(prefix + '/submit-special-collection').post(params);
    };
    
    this.getSpecialCollectionByID = function(id){
        return Restangular.one(prefix + '/get-special-collection'+'/'+id).get();
    };

   /* this.uploadImage = function (param) {

        var fd = $rootScope.object2FormData(param);

        return Restangular.one(prefix + '/upload-image')
            .withHttpConfig({
                transformRequest: angular.identity
            })
            .customPOST(fd, '', undefined, {
                'Content-Type': undefined
            });
       
    };*/
    
    
    this.getThumbnail=function(webID){
        return Restangular.one(prefix + '/get-thumbnail'+'/'+webID).get();
    };
    
    this.getThumbnailByImageID=function(imageID){
        return Restangular.one(prefix + '/get-thumbnail-by-imageID'+'/'+imageID).get();
    };
    
    this.downloadCsv = function(data) {
        return Restangular.all(prefix + "/download-csv").post(data);
    };
    
    this.getAllSpecialCollection = function (param) {
        return Restangular.all(prefix + "/get-all-special-collections").post(param);
    };
    
    this.getAllSpecialCollectionType=function(){
        return Restangular.all(prefix + "/get-all-special-collection-types").getList();
    };
    
    this.getAllSpecialCollectionStatus=function(){
        return Restangular.all(prefix + "/get-all-special-collection-status").getList();
    };
    
    this.saveSpecialCollection=function(param){
        return Restangular.all(prefix + "/update-special-collections").post(param);
    };
    
    this.searchWebfunction=function(param){
    
        return Restangular.all(prefix + "/search-websites").post(param);
    };
    
    this.cmsSearchWebfunction=function(param){

        return Restangular.all(prefix + "/cms-search-websites").post(param);
    };
    
    this.editSpecialCollection=function(param){
        
        return Restangular.all(prefix + "/edit-special-collection").post(param);
    };
    
    this.publishSpecialCollection=function(param){

        return Restangular.all(prefix + "/publish-special-collection").post(param);
    };
    
    this.getBookmarkList=function(param){
        return Restangular.all(prefix + "/get-all-bookmark-list").post(param);
    };
});
