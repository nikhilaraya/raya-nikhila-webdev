(function () {
    angular
        .module("MoviesSite")
        .controller("homeController", homeController);

    function homeController(movieService, $routeParams, $location) {
        var model = this;
        model.searchMoviesByTitle = searchMoviesByTitle;

        function init() {
            movieService.popularMovies().then(function (movies) {
                model.pMovies = movies.data.results;
            });

        }
        init();
        function searchMoviesByTitle(title) {
            movieService.searchMoviesByTitle(title)
                .then(function (movies) {
                    model.pMovies = movies.data.results;
                });
        }
    }
})();
