(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);

    function websiteService($http) {
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;




        function updateWebsite(websiteId,website){
            var url = "/api/assignment/user/"+website.developerId+"/website/"+websiteId;

            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
           //var websiteFound = findWebsiteById(websiteId);
           //websiteFound.name = website.name;
           //websiteFound.description = website.description;
        }

        function createWebsite(website) {
            var url = "/api/assignment/user/"+website.developerId+"/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(userId,websiteId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId;
            return $http.delete(url, websiteId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId,userId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // return websites.find(function (website) {
            //     return website._id === websiteId;
            // });
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
