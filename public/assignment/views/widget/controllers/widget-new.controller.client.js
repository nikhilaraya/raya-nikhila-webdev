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
            var headingWidget = widgetService.createWidget(model.pageId,heading);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+headingWidget._id);
        }

        function createHtml() {
            var htmlWidget = {
                widgetType:"HTML",
                text:""
            };
            var htmlNewWidget = widgetService.createWidget(model.pageId,htmlWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+htmlNewWidget._id);
        }

        function createYoutube() {
            var youtubeWidget = {
                widgetType:"YOUTUBE",
                "width": "100%",
                "url": ""
            };
            var youTubeWidget = widgetService.createWidget(model.pageId,youtubeWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+youTubeWidget._id);
        }

        function createImage() {
            var imageWidget = {
                widgetType:"IMAGE",
                "width": "100%",
                "url": ""
            };
            var imageNewWidget = widgetService.createWidget(model.pageId,imageWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+imageNewWidget._id);
        }


    }
})();
