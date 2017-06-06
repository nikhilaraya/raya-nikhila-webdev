(function () {
    angular
        .module('WAM')
        .directive("wdDraggable",wdDraggable);

    function wdDraggable($http,$routeParams,widgetService) {
        function linkFunction(scope,element){
            var startIndex = null;
            var stopIndex = null;
            $(element).sortable({
                start : function (event,ui) {
                    startIndex = ui.item.index();
                },
                stop : function (event,ui) {
                    stopIndex = ui.item.index();
                    var pageId = $routeParams['pageId'];
                    widgetService.sortingWidgets(startIndex,stopIndex,pageId).then(function () {

                    })
                }
            });
        }
        return {
        link: linkFunction
        }
    }

})()