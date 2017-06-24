(function() {
    angular
        .module("MoviesSite")
        .controller("manageMoviesController", manageMoviesController);

    function manageMoviesController(apiMoviesService,
                                    $rootScope,
                                    $location,
                                    $sce,
                                    userService,
                                    movieService){

        var model = this;
        model.logout = logout;

        model.updateMovie = updateMovie;
        model.deleteMovie = deleteMovie;

        function init(){
            getLoggedInUser();
            findAllMovies();
        }
        init();

        function logout(){
            userService
                .logout()
                .then(function(response){
                    $location.url("/home");
                },
                function () {
                    $location.url("/home");
                });
        }

        function deleteMovie(tmdbId,userId) {
            movieService
                .deleteMovie(tmdbId,userId)
                .then(function (response) {
                    findAllMovies();
                });
        }

        function updateMovie(tmdbId,userId,visible,flagged,text){
            var reviews = {
                userId: userId,
                visible: visible,
                flagged: flagged,
                text: text
            };

            movieService
                .updateMovie(tmdbId,reviews)
                .then(function (response) {
                    var addedReview = response.data;
                    if(addedReview){
                        model.success = "Review updated";
                    }
                    else
                    {
                        model.error = "unable to update review";
                    }
                });
        }

        function findAllMovies(){
            movieService
                .findAllMovies()
                .then(function (response) {
                    var allMovies = response.data;
                    var resultSet = [];

                    for(var i in allMovies){
                        for(var j in allMovies[i].reviews){
                            allMovies[i].reviews[j].tmdbId = allMovies[i].tmdbId;
                            allMovies[i].reviews[j].title = allMovies[i].title;
                            resultSet.push(allMovies[i].reviews[j]);
                        }
                    }

                    model.reviews = resultSet;
                    model.moviesCount = resultSet.length;
                    return resultSet;

                });
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
    }

})();
