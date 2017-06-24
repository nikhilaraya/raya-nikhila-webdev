(function () {
    angular
        .module("MoviesSite")
        .controller("movieInfoController",movieInfoController);

    function movieInfoController($routeParams,
                                 $rootScope,
                                 apiMoviesService,
                                 $sce,
                                 $location,
                                 movieService,
                                 userService) {

        var model = this;
        model.id = $routeParams.id;
        model.reviewPage = reviewPage;
        model.giveError = giveError;
        var submitted = false;
        model.logout = logout;
        model.reportReview = reportReview;
        model.needtoLoginForProfile = needtoLoginForProfile;
        var loggedInUserId = null;

        function init() {
            getMovieDetails();
            getMovieReviewsandRatings();
            getLoggedInUser();
        }
        return init();

        function reportReview(_id) {
            var reviewId = _id;
            var tmdbId = model.id;

            var twoIds ={
                reviewId : reviewId,
                tmdbId :tmdbId
            };

            movieService
                .reportReview(twoIds)
                .then(function (response) {
                    model.reportReviewMessage = "review reported";
                },
                function () {
                    model.reportReviewErrorMessage = "something went wrong";
                });
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

        function needtoLoginforProfile() {
            model.givecheckoutusererror = "Please login";
        }

        function giveError() {
            model.notLoggedInError ="Please login to review";
        }

        function getLoggedInUser() {
            if($rootScope.currentUser){
                model.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;
            }
            else {
                model.notloggedIn = "true";
            }
        }

        function getMovieReviewandRatings() {
            movieService
                .findMovieById(model.id)
                .then(function (response) {
                    model.movieInfo = response.data;
                    var noOfRatings = model.movieInfo.ratings.length;
                    var sumOfRatings = 0;
                    for(var i in model.movieInfo.ratings)
                    {
                        var sumOfRatings = sumOfRatings + model.movieInfo.ratings[i].value;
                    }
                    var avgRating = sumOfRatings/noOfRatings;
                    model.avgRating = avgRating.toFixed(1);
                });
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

        function reviewPage() {
            userService
                .findUserById(loggedInUserId)
                .then(function (response) {
                    var usersReviews = response.data.reviews;
                    for(var i in userReviews){
                        if(usersReviews[i].tmdbId == model.id){
                            model.error = "review already submitted";
                            return;
                        }
                    }
                    $location.url("/movie/"+model.id+"/review");
                });
        }
    }


})();
