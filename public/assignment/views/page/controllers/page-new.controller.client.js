(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  $location,
                                  currentUser,
                                  pageService) {
        var model = this;
        model.userId = currentUser._id;
       // model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            pageService.findPageByWebsiteId(model.userId,model.websiteId).then(renderPages);

            function renderPages(pages) {
                model.pages = pages;
            }
        }
        init();

        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(model.userId,page).then(function () {
                $location.url('/website/'+model.websiteId+'/page');
            });
        }
    }
})();
