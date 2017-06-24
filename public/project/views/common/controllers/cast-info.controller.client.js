(function () {
    angular
        .module("MoviesSite")
        .controller("castController",castController);

    function castController(userService,
                            $routeParams,
                            $rootScope,
                            $location,
                            apiMoviesService) {

        var model = this;
        model.id = $routeParams.id;
        model.logout = logout;

        function init() {
            getLoggedInUser();
            findCastById();
        }
        return init();

        function logout() {
            userService
                .logout()
                .then(function(response){
                    $location.url("/home");
                },
                function () {
                    $location.url("/home");
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

        function findCastById() {
            apiMoviesService
                .findCastById(model.id, function (response) {
                    response.movie_credits.cast.splice(8, response.movie_credits.cast.length-8);
                    model.actor = response;
                })
        }

    }
})();
