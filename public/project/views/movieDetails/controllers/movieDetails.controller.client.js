/**
 * Created by user on 07-06-2017.
 */

(function () {
    angular
        .module("MoviesSite")
        .controller("movieDetailsController", movieDetailsController);

    function movieDetailsController(movieService, $routeParams, $location) {
        var model = this;
        model.movieId = $routeParams['movieId'];
        movieService.searchMovieByID(model.movieId).then(function (response) {
                model.movie = response.data;
                //console.log(model.movie.title);
                model.genres = model.movie.genres;
            })
    }
})();