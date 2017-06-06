(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams,
                                  widgetService,$sce) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        widgetService
            .findWidgetByPageId(model.userId,model.websiteId,model.pageId)
            .then(renderWidgets);

        function renderWidgets(widgets) {
             console.log(widgets);
            model.widgets = widgets;
            for(var w in widgets)
            {
                console.log(widgets[w].text+widgets[w].pageId);
            }
        }

        function widgetUrl(widget) {
            console.log("in widget url"+widget.widgetType+widget.size);
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }
})();
