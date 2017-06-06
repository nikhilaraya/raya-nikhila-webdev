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

        model.widget = widgetService
            .findWidgetById(model.userId,model.websiteId,model.pageId,model.widgetId)
            .then(renderWidget);

        function renderWidget(widget) {

            model.widget = widget;
            model.name = model.widget.widgetType;
            model.text = model.widget.text;
            model.url = model.widget.url;
            model.size = model.widget.size;
            model.width = model.widget.width;
        }

        // model.name = model.widget.widgetType;
        // model.text = model.widget.text;
        // model.url = model.widget.url;
        // model.size = model.widget.size;
        // model.width = model.widget.width;

        model.editHeading = editHeading;
        model.editImage = editImage;
        model.editYoutube = editYoutube;
        model.deleteHeading = deleteHeading;
        model.deleteImage = deleteImage;
        model.deleteYoutube = deleteYoutube;



        function deleteHeading() {
            widgetService
                .deleteWidget(model.userId,model.websiteId,model.pageId,model.widgetId)
                .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });
        }

        function deleteImage() {
            widgetService
                .deleteWidget(model.userId,model.websiteId,model.pageId,model.widgetId)
                .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            })

        }

        function deleteYoutube() {
            widgetService
                .deleteWidget(model.userId,model.websiteId,model.pageId,model.widgetId)
                .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            })

        }

        function editHeading() {
            console.log("editedHeading enter");
            var headingWidget = {
            _id: model.widget._id,
            widgetType: model.name,
                pageId: model.widget.pageId,
                text:model.text,
                size:model.size
            };
            console.log("edited"+headingWidget.text);
            widgetService
                .updateWidget(model.userId,model.websiteId,model.pageId,model.widgetId,headingWidget)
                .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            })


        }

        function editImage() {
            var imageWidget = {
                _id: model.widget._id,
                widgetType: model.name,
                pageId: model.widget.pageId,
                url:model.url,
                width:model.width
            };
            widgetService
                .updateWidget(model.userId,model.websiteId,model.pageId,model.widgetId,imageWidget)
                .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            })

        }

        function editYoutube() {
            var youtubeWidget = {
                _id: model.widget._id,
                widgetType: model.name,
                pageId: model.widget.pageId,
                url:model.url,
                width:model.width
            };
            widgetService
                .updateWidget(model.userId,model.websiteId,model.pageId,model.widgetId,youtubeWidget)
                .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            })

        }


}
})();


