(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService($http) {
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.findWidgetByPageId = findWidgetByPageId;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.sortingWidgets = sortingWidgets;

        function sortingWidgets(startIndex,stopIndex,pageId) {
            var url = "/api/assignment/page/"+pageId+"/widget?initial="+startIndex+"&final="+stopIndex;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }


        
        function createWidget(userId,websiteId,pageId,widget) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(userId,websiteId,pageId,widgetId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetByPageId(userId,websiteId,pageId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function updateWidget(userId,websiteId,pageId,widgetId,widget){
            var url ="/api/assignment/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            console.log(url);
            return $http.put(url, widget)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
            // var widgetFound = findWidgetById(widgetId);
            // var widgetIndex = widgets.indexOf(widgetFound);
            // widgets[widgetIndex] = widget;
        }

        function deleteWidget(userId,websiteId,pageId,widgetId) {
            var url ="/api/assignment/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.delete(url, widgetId)
                .then(function (response) {
                    return response.data;
                });
            // var widgetFound = findWidgetById(userId,websiteId,pageId,widgetId);
            // var widgetIndex = widgets.indexOf(widgetFound);
            // widgets.splice(widgetIndex, 1);
        }


    }
})();

