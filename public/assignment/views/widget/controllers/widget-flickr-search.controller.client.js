(function () {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);

    function flickrController(widgetService,flickrService,$location,$routeParams) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {

            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var imageWidget = {
                widgetType:"IMAGE",
                "width": "100%",
                "url": url,
                "_id": model.widgetId,
                "pageId":model.pageId
            };
            widgetService
                .updateWidget(model.userId,model.websiteId, model.pageId, model.widgetId, imageWidget)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+model.widgetId);
                });
        }

        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    //console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }
})();