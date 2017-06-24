(function () {
    angular
        .module("MoviesSite")
        .controller("homeController", homeController);

    function homeController(apiMoviesService, $location) {
        var model = this;
        model.genreName = genreName;

        function init() {
            getNowPlaying();
            getGenres();
        }
        init();

        function genreName(id) {
            for(var genre in model.genres){
                if(model.genres[genre].id === id){
                    return model.genres[genre].name;
                }
            }
        }

        function getNowPlaying() {
            apiMoviesService
                .getNowPlaying()
                .then(function (response) {
                    model.movies = response.data.results;
                });
        }

        function getGenres() {
            apiMoviesService
                .getGenres()
                .then(function (response) {
                    model.genres = response.data.genres;
                })
        }

    }
})();


