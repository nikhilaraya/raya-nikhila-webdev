(function () {
    angular
        .module("MoviesSite")
        .controller("profileController",profileController);

    function profileController($routeParams, $location, userService, $rootScope) {
        var model =this;
        model.logout = logout;
        model.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;

        function init(){
            userService
                .findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                    if(model.user.rates.length == 0){
                        model.norates = true;
                    }
                    if(model.user.reviews.length == 0){
                        model.noreviews = true;
                    }
                    if(model.user.follows.length == 0){
                        model.nofollowers = true;
                    }
                });
        }
        init();
        if($rootScope.currentUser.admin === "true"){
            model.admin = "true";
        }
        else{
            model.noadmin = "false";
        }

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
    }
})();
