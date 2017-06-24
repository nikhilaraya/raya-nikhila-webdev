(function(){
    angular
        .module("MoviesSite")
        .controller("adminOperationController",adminOperationController);

    function adminOperationController(apiMoviesService,
                                      $rootScope,
                                      $location,
                                      $sce,
                                      userService){

        var model = this;
        model.logout = logout;

        function init(){
            getLoggedInUser();
        }
        return init();

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

        function getLoggedInUser(){
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
