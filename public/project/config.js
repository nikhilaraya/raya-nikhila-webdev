/**
 * Created by user on 07-06-2017.
 */
(function() {
    angular
        .module("MoviesSite")
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/movieDetails/:movieId", {
                templateUrl: "views/movieDetails/templates/movieDetails.view.client.html",
                controller: "movieDetailsController",
                controllerAs: "model"
            })
    }
})();

