(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            function renderWebsites(websites) {
                model.websites = websites;
            }

            websiteService
                .findWebsiteById(model.websiteId,model.userId)
                .then(renderWebsiteById);

            function renderWebsiteById(website) {
                model.website = website;
            }
            //model.websites = websiteService.findAllWebsitesForUser(model.userId);
            //model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(model.userId,websiteId).then(function () {
                $location.url('/user/'+model.userId+'/website');
            });

        }

        function updateWebsite(websiteId,website) {
            websiteService.updateWebsite(websiteId,website).then(function () {
                $location.url('/user/'+model.userId+'/website');
            });
        }
    }
})();
