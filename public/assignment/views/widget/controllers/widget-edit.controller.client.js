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
            console.log(widget.type);
            model.widget = widget;
            model.name = model.widget.type;
            model.text = model.widget.text;
            model.url = model.widget.url;
            model.size = model.widget.size;
            model.width = model.widget.width;
            model.rows = model.widget.rows;
            model.placeholder = model.widget.placeholder;
            model.formatted = model.widget.formatted;
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
        model.editHtml = editHtml;
        model.deleteHTML = deleteHTML;
        model.editText = editText;


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
        
        function deleteHTML() {
            widgetService
                .deleteWidget(model.userId,model.websiteId,model.pageId,model.widgetId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function editHeading() {
            var headingWidget = {
            _id: model.widget._id,
                type: model.name,
                pageId: model.widget.pageId,
                text:model.text,
                size:model.size
            };
            widgetService
                .updateWidget(model.userId,model.websiteId,model.pageId,model.widgetId,headingWidget)
                .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            })
        }

        function editHtml() {
            var htmlWidget = {
                _id: model.widget._id,
                pageId: model.widget.pageId,
                text: model.text
            };
            widgetService.updateWidget(model.userId,model.websiteId,model.pageId,model.widgetId,htmlWidget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function editText() {
            console.log(model.placeholder);
        var textWid= {
            _id: model.widget._id,
            type:"TEXT",
            rows: model.rows,
            placeholder: model.placeholder,
            formatted: model.formatted,
            text: model.text
        };
            widgetService.updateWidget(model.userId,model.websiteId,model.pageId,model.widgetId,textWid)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function editImage() {
            var imageWidget = {
                _id: model.widget._id,
                type: model.name,
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
                type: model.name,
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


