(function () {
    angular
        .module("MoviesSite")
        .controller("profileEditController",profileEditController);

    function profileEditController($routeParams, $location, userService,$rootScope) {
        var model = this;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        model.logout = logout;

        function init(){
            userService
                .findUserById(userId)
                .then(function(response){
                    model.user = response.data;
                });
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function (response) {
                    $location.url("/home");
                },
                function () {
                    $location.url("/home");
                });
        }

        function deleteUser(){
            userService
                .deleteUser(userId)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/login");
                    }
                    else
                    {
                        model.error = "Please try again!";
                    }
                });
        }

        function updateUser(user) {
            userService
                .updateUser(userId,user)
                .then(function (res) {
                    var userUpdated = res.data;
                    if(userUpdated){
                        model.success = "Successfully updated!";
                    }
                    else
                    {
                        model.error = "Please try again";
                    }
                });
        }

    }
})();
