(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                               $location,
                               widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createHeading = createHeading;
        model.createHtml = createHtml;
        model.createImage = createImage;
        model.createYoutube =createYoutube;

        function createHeading() {

            var heading = {
                widgetType:"HEADING",
                size:0,
                text:""
            };

            console.log(heading);
            widgetService
                .createWidget(model.userId,model.websiteId,model.pageId,heading)
                .then(function (headingWidget) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+headingWidget._id);
            })
        }

        function createHtml() {
            var htmlWidget = {
                widgetType:"HTML",
                text:""
            };
            widgetService
                .createWidget(model.userId,model.websiteId,model.pageId,htmlWidget)
                .then(function (htmlNewWidget) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+htmlNewWidget._id);
            })
        }

        function createYoutube() {
            var youtubeWidget = {
                widgetType:"YOUTUBE",
                "width": "100%",
                "url": ""
            };
            widgetService
                .createWidget(model.userId,model.websiteId,model.pageId,youtubeWidget)
                .then(function (youTubeWidget) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+youTubeWidget._id);
                })
        }

        function createImage() {
            var imageWidget = {
                widgetType:"IMAGE",
                "width": "100%",
                "url": ""
            };
            widgetService
                .createWidget(model.userId,model.websiteId,model.pageId,imageWidget)
                .then(function (imageNewWidget) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+imageNewWidget._id);
                })
        }


    }
})();