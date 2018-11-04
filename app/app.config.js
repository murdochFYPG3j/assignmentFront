// Shared env vars in all environments 
var shared = {
    DEBUG_MODE: false,
    //status
    AUTHENTICATED: 'AUTHENTICATED',
    PAGE_SIZE: 10,
    
    BUTTON_NAME:"Export filtered",
    NOMINATION_STATUS_PENDING:"NOMINATION_PENDING",
    NOMINATION_STATUS_REJECTED:"NOMINATION_REJECTED",
    NOMINATION_STATUS_APPROVED:"NOMINATION_APPROVED",
    FEATURE_FLAG_YES:"TYPE_FLAG_YES",
    FEATURE_FLAG_NO:"TYPE_FLAG_NO",
    STATUS_DRAFT:"SPECIAL_COLLECTION_DRAFT",
    STATUS_PUBLISHED:"SPECIAL_COLLECTION_PUBLISHED", 
    BOOKMARK_SEARCH_TYPE_SOLR:"BOOKMARK_SEARCH_TYPE_SOLR",
    BOOKMARK_SEARCH_TYPE_CMS:"BOOKMARK_SEARCH_TYPE_CMS",
    
    NOMINATION_ACCEPT_ID: 1,
    NOMINATION_REJECT_ID:2,
    ROLEFUNCTION_ADMINISTRATOR:"ADMINISTRATOR",
    ROLEFUNCTION_MANAGER:"MANAGER",
    ROLEFUNCTION_OFFICER:"OFFICER",
    
    CONTENTTYPES:[{name:'Documents',code:'Documents'},{name:'Images',code:'Images'},{name:'Websites',code:'Websites'}],
};


var modules = {

};


var bannerType = {
   
};

// 
var environments = {
    development: {
        Constants: shared,
        Modules: modules,
        BannerType: bannerType
    },
    sit: {
        Constants: shared,
        Modules: modules,
        BannerType: bannerType
    },
    staging: {
        Constants: shared,
        Modules: modules,
        BannerType: bannerType
    },
    production: {
        Constants: shared,
        Modules: modules,
        BannerType: bannerType
    }
};


var staging = {
    BASE_URL: '', //writeback the URL to link to end 
    LOGOUT_URL: '',
    env: 'staging'
};

/*
var production = {
    BASE_URL: 'https://wasadmin.nlb.gov.sg:83/web/was-webservice-admin', 
    LOGOUT_URL: 'https://ssoadmin.nlb.gov.sg:83/OAuth2/Account/ExternalLogOff?returnUrl=https://wasadmin.nlb.gov.sg:83/web/was-webservice-admin/api/v1/user/server-logout',
    env: 'production'
};
*/

//join shared and respective environment

environments.staging.Constants = Object.assign({}, shared, staging);
//environments.production.Constants = Object.assign({}, shared, production);


//environments.production.buildpack  = process.env.BUILDPACK_URL;

module.exports = environments;
