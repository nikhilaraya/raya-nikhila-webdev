(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  currentUser,
                                  websiteService) {
        var model = this;

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            function renderWebsites(websites) {
                model.websites = websites;
            }
        }
        init();


        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website).then(function () {
                $location.url('/website');
            });

        }
    }
})();
