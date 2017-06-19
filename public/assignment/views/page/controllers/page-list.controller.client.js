(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

     function pageListController($routeParams, currentUser,pageService) {

         var model = this;

        // model.userId = $routeParams['userId'];
         model.userId = currentUser._id;
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