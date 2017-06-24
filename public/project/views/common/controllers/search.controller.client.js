(function () {
    angular
        .module("MoviesSite")
        .controller("searchController",searchController);

    function searchController(apiMoviesService,
                              $rootScope,
                              $routeParams,
                              $location,
                              userService) {

        var model = this;
        model.searchMoviesfromSearchPage = searchMoviesfromSearchPage;
        model.genreName = genreName;
        model.logout = logout;
        model.movieName = $routeParams.movieName;
        var searchText = $routeParams.movieName;

        function init() {
            searchMovies(searchText);
            getGenres();
            getLoggedInUser();
        }
        init();

        function getLoggedInUser() {
            if($rootScope.currentUser){
                model.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;
            }
            else {
                model.notloggedIn = "true";
            }
        }

        function logout() {
            userService
                .logout()
                .then(
                    function (response) {
                        $location.url("/home");
                    },
                    function () {
                        $location.url("/home");
                    }
                );
        }

        function searchMoviesfromSearchPage(searchText) {
            apiMoviesService
                .searchMovies(searchText)
                .then(function (response) {
                    model.movies = response.data.results;
                });
        }

        function genreName(id) {
            for(var genre in model.genres){
                if(model.genres[genre].id === id){
                    return model.genres[genre].name;
                }
            }
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