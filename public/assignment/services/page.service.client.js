(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService($http) {
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.createPage = createPage;
        this.updatePage = updatePage;


        function updatePage(userId,pageId,page){
            var url = "/api/assignment/user/"+userId+"/website/"+page.websiteId+"/page/"+pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPage(userId,page) {
            var url = "/api/assignment/user/"+userId+"/website/"+page.websiteId+"/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });

        }

        function deletePage(userId,websiteId,pageId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            return $http.delete(url, pageId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(userId,websiteId,pageId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByWebsiteId(userId,websiteId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var results = [];
            //
            // for(var v in page) {
            //     if(page[v].websiteId === websiteId) {
            //         page[v].created = new Date();
            //         page[v].accessed = new Date();
            //         results.push(page[v]);
            //     }
            // }
            //
            // return results;
        }
    }
})();
