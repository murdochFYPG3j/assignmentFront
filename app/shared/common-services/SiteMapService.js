angular.module('was-admin').service("sitemapService", function (Restangular) {

    var prefix = "api/v1/sitemap/";


    this.generateSitemaps = function () {
        return Restangular.one(prefix + "generate-sitemap").get();
    };

  

});
