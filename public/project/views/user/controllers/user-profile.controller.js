(function () {
    angular
        .module("MoviesSite")
        .controller("userProfileController",userProfileController);

    function userProfileController($routeParams, $location, userService,$rootScope) {
        var model = this;
        var username = $routeParams.username;
        var currentUserId = $rootScope.currentUser._id;

        model.logout = logout;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;;

        function init(){
            findUserByUsername();
            getLoggedInUser();
            alreadyFollowing()
        }
        return init();

        function alreadyFollowing(){
            userService
                .findUserById(loggedInUserId)
                .then(function (response){
                    var following = response.data.follows;
                    for(var userFollowing in following){
                        if(following[userFollowing].username == username){
                            model.following = "true";
                            return;
                        }
                    }
                    model.notfollowing = "true";
                });
        }

        function unfollowUser(){
            userService
                .unfollowUser(currentUserId,username)
                .then(function (response){
                    var unfollow = response.data;
                    if(unfollow){
                        model.unfollow = "you are now unfollowing this user";
                    }
                    else
                    {
                        model.error = "Could not unfollow this user"
                    }
                });
        }

        function followUser() {
            userService
                .findUserById(currentUserId)
                .then(function (response) {
                    var following = response.data.follows;
                    for(var i in following){
                        if(following[i].username == username)
                        {
                            model.error = "You are already following this user";
                            return;
                        }
                    }
                    userService
                        .findUserByUsername(username)
                        .then(function (response) {
                            var foundUser = response.data;
                            var userId = foundUser._id;
                            var follows = {
                                userId : userId,
                                username : username
                            };

                            userService
                                .followUser(currentUserId,follows)
                                .then(function(res){
                                    var newUser = res.data;
                                    if(newUser){
                                        model.success = "you are now following";
                                    }
                                    else
                                    {
                                        model.error = "Something went wrong!";
                                    }
                                });
                        });
                });
        }

        function findUserByUsername() {
            userService
                .findUserByUsername(username)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        function getLoggedInUser() {
            if($rootScope.currentUser){
                model.loggedIn = "true";
                currentUserId = $rootScope.currentUser._id;
            }
            else
            {
                model.notloggedIn = "true";
            }
        }

        function logout(){
            userService
                .logout()
                .then(function(response){
                    $location.url("/home");
                },
                function(){
                    $location.url("/home");
                });
        }


    }
})();
