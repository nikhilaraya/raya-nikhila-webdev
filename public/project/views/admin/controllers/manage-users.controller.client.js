(function () {
    angular
        .module("MoviesSite")
        .controller("manageUsersController",manageUsersController);

    function manageUsersController(apiMoviesService,
                                   $rootScope,
                                   $location,
                                   $sce,
                                   userService,
                                   movieService){

        var model = this;
        model.logout = logout;
        model.createUser = createUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            getLoggedInUser();
            findAllUsers();
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

        function createUser(username,password,admin) {
            var user={
                username: username,
                password: password,
                admin: admin
            };

            userService
                .createUser(user)
                .then(function (response) {
                    model.createsuccess = "Created the user successfully";
                    userService
                        .findAllUsers()
                        .then(function (response) {
                            model.users = response.data;
                            model.userCount = model.users.length;
                        });
                });
        }

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function (response) {
                    model.warning = "User deleted successfully";
                    model.createsuccess = null;
                    userService
                        .findAllUsers()
                        .then(function (response) {
                            model.users = response.data;
                            model.userCount = model.users.length;
                        });
                })
        }

        function updateUser(userId,user) {
            userService
                .updateUser(userId,user)
                .then(
                    function (response) {
                        model.updatedmessage = "updated Successfully";
                        userService
                            .findAllUsers()
                            .then(function (response) {
                                model.users = response.data;
                                model.userCount = model.users.length;
                            });
                    });
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (response) {
                    model.users = response.data;
                    model.userCount = model.users.length;
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