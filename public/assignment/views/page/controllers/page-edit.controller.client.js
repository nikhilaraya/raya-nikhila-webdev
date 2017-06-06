(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            pageService.findPageByWebsiteId(model.userId,model.websiteId).then(renderPages);

            function renderPages(pages) {
                model.pages = pages;
            }
            pageService.findPageById(model.userId,model.websiteId,model.pageId).then(renderPageById);

            function renderPageById(page) {
                model.page = page;
            }
        }
        init();

        function deletePage(pageId) {
            pageService.deletePage(model.userId,model.websiteId,pageId).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
            });
        }

        function updatePage(pageId,page) {
            pageService.updatePage(model.userId,pageId,page).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
            })
        }
    }
})();
