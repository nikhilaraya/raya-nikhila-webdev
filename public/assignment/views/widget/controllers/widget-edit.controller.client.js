(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId =$routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.widget = widgetService.findWidgetById(model.widgetId);
        model.name = model.widget.widgetType;
        model.text = model.widget.text;
        model.url = model.widget.url;
        model.size = model.widget.size;
        model.width = model.widget.width;

        model.editHeading = editHeading;
        model.editImage = editImage;
        model.editYoutube = editYoutube;
        model.deleteHeading = deleteHeading;
        model.deleteImage = deleteImage;
        model.deleteYoutube = deleteYoutube;

        function deleteHeading() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteImage() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteYoutube() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function editHeading() {
            var headingWidget = {
            _id: model.widget._id,
            widgetType: model.name,
                pageid: model.widget.pageId,
                text:model.text,
                size:model.size
            };
            widgetService.updateWidget(model.widgetId,headingWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function editImage() {
            var imageWidget = {
                _id: model.widget._id,
                widgetType: model.name,
                pageid: model.widget.pageId,
                url:model.url,
                width:model.width
            };
            widgetService.updateWidget(model.widgetId,imageWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function editYoutube() {
            var youtubeWidget = {
                _id: model.widget._id,
                widgetType: model.name,
                pageid: model.widget.pageId,
                url:model.url,
                width:model.width
            };
            widgetService.updateWidget(model.widgetId,youtubeWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }


}
})();


