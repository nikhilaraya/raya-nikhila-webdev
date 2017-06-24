(function () {
    angular
        .module("MoviesSite")
        .controller("movieDefaultController",movieDefaultController);

    function movieDefaultController(apiMoviesService,
                                    $rootScope,
                                    $location,
                                    $sce,
                                    userService) {

        var model = this;
        model.genreName = genreName;
        model.logout = logout;

        function init() {
            getGenres();
            getNowplayingMovies();
            getUpcomingMovies();
            getLoggedInUser();
        }
        return init();

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

        function getLoggedInUser() {
            if($rootScope.currentUser){
                model.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;
            }
            else
            {
                model.notloggedIn = "true";
            }
        }

        function getGenres() {
            apiMoviesService
                .getGenres()
                .then(function (response) {
                    model.genres = response.data.genres;
                })
        }

        function getNowplayingMovies() {
            apiMoviesService
                .getNowPlaying()
                .then(function (response) {
                    model.nowPlaying = response.data.results;
                });
        }

        function getUpcomingMovies() {
            apiMoviesService
                .getUpcomingMovies()
                .then(function (response) {
                    model.upcoming = response.data.results;
                });
        }

        function fetchAllUpcomingVideos(response) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp){
                if(resp[r].data.results.length > 0){
                    model.nowPlaying[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function genreName(id) {
            for(var genre in model.genres){
                if(model.genres[genre].id === id)
                {
                    return model.genres[genre].name;
                }
            }
        }


    }

})();