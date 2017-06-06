(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

     function pageListController($routeParams, pageService) {

         var model = this;

         model.userId = $routeParams['userId'];
         model.websiteId = $routeParams['websiteId'];

         function init() {
             pageService.findPageByWebsiteId(model.userId,model.websiteId).then(renderPages);

             function renderPages(pages) {
                 model.pages = pages;
             }
         }
         init();
     }
})();