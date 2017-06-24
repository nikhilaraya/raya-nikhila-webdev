(function () {
    angular
        .module("MoviesSite")
        .controller("movieReviewController",movieReviewController);

    function movieReviewController($routeParams,
                                   $rootScope,
                                   $location,
                                   $sce,
                                   apiMoviesService,
                                   userService,
                                   movieService) {

        var model = this;
        model.id = $routeParams.id;
        var userId = $rootScope.currentUser._id;
        var tmdbId = $routeParams.id;
        model.submitRatingReview = submitRatingReview;
        model.logout = logout;

        function init() {
            getMovieDetails();
            getUserName();
            getLoggedInUser();
        }
        return init();

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

        function getMovieDetails() {
            apiMoviesService.findMovieById(model.id,function (response) {
                if(response,videos.results.length>0) {
                    var embedUrl = 'https://www.youtube.com/embed/';
                    response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                    response.untrusted_video_url = embedUrl + response.videos.results[0].key;
                }
                response.credits.cast.splice(8,response.credits.cast.length - 8);
                model.movie = response;
                model.movie.criticsRating = response.vote_average /2;
                model.movie.ratedByUsers = [];
                model.movie.reviewedByUsers = [];
                var now = new Date();
                var releaseDate = new Date(response.release_date);
                if(now>releaseDate){
                    model.released = true;
                }

            });
        }

        function getUserName() {
            userService
                .findUserById(userId)
                .then(function (response) {
                    var returnedUser = response.data;
                    if(returnedUser._id){
                        model.userName = returnedUser.username;
                    }
                    else
                    {
                        model.error = "unable to add review";
                    }
                });
        }

        function submitRatingReview(review,movie,userName) {

            var imageUrl = "https://image.tmdb.org/t/p/w130/"+movie.poster_path;
            var rates = {
                name : movie.title,
                tmdbId : tmdbId,
                rating : parseInt(review.rating),
                imageUrl : imageUrl
            };

            var reviews = {
                name : movie.title,
                tmdbId : tmdbId,
                review : review.reviewtext,
                imageUrl : imageUrl
            };

            var rateandreview = {
                rates : rates,
                reviews : reviews
            };
            var ratings = {
                userId : userId,
                username : userName,
                value : parseInt(review.rating)
            };
            var reviews = {
                userId : userId,
                username : userName,
                text :review.reviewtext,
                visible : "true",
                flagged : "false"
            };
            var ratingsandreviews = {
                ratings : ratings,
                reviews : reviews
            };
            var movie = {
                tmdbId : tmdbId,
                title  : movie.title,
                imageUrl : imageUrl,
                ratings : [ratings],
                reviews : [reviews]
            };

            userService
                .submitRatingReview(userId,rateandreview)
                .then(function (response) {
                    var i = 1;
                });

            movieService
                .findMovieById(tmdbId)
                .then(function (response) {
                    var returnedmovie = response.data;
                    if(returnedmovie.tmdbId)
                    {
                        movieService
                            .updateRatingAndReview(tmdbId,ratingsandreviews)
                            .then(function (response) {
                                var addedObject = response.data;
                                if(addedObject){
                                    $location.url("/movie/"+tmdbId);
                                }else{
                                    model.error ="unable to add review";
                                }
                            });
                    }
                    else
                    {
                        movieService
                            .createMovie(movie)
                            .then(function (response) {
                                var addedObject = response.data;
                                if(addedObject){
                                    $location.url("/movie/"+tmdbId);
                                }
                                else
                                {
                                    model.error = "unable to add new movie";
                                }
                            });
                    }
                });
        }

    }

})();
