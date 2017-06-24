(function () {
    angular
        .module("MoviesSite")
        .controller("manageFlaggedReviewsController", manageFlaggedReviewsController);

    function manageFlaggedReviewsController(apiMoviesService,
                                            $rootScope,
                                            $location,
                                            $sce,
                                            userService,
                                            movieService) {

        var model = this;
        model.removeReview = removeReview;
        model.donotremovereview = doNotRemoveReview;
        model.logout = logout;

        function init(){
            getLoggedInUser();
            findFlaggedReviews();
        }
        init();

        function logout(){
            userService
                .logout()
                .then(function (response) {
                    $location.url("/home");
                },
                function () {
                    $location.url("/home");
                });
        }

        function removeReview(_id,tmdbId){
            var reviewId = _id;
            var twoIds = {
                reviewId : reviewId,
                tmdbId : tmdbId
            };

            movieService
                .removeReview(twoIds)
                .then(function (response) {
                    model.reportReviewMessage = "review deleted";
                    findFlaggedReviews();
                },
                function () {
                    model.reportReviewErrorMessage = "Could not delete review"
                });
        }

        function doNotRemoveReview(_id,tmdbId) {
            var reviewId = _id;
            var twoIds = {
                reviewId : reviewId,
                tmdbId : tmdbId
            };

            movieService
                .doNotRemoveReview(twoIds)
                .then(function (response) {
                    model.reportReviewMessage = "Review has been added";
                    findFlaggedReviews();
                },
                function () {
                    model.reportReviewErrorMessage = "Review will be reported";
                });
        }

        function findFlaggedReviews() {
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
                    model.results = resultSet;
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
