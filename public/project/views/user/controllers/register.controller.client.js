(function () {
    angular
        .module("MoviesSite")
        .controller("registerController", registerController);

    function registerController($location, userService) {
        var model = this;
        model.register = register;

        function register(username,password,reTypePassword, firstName, lastName){
            var admin = "false";
            if(model.myform.$valid == false){
                model.error = "Please enter the username and password";
                model.alert = "*Required";
            }
            if(password != reTypePassword){
                model.error = "Passwords didn't match! Please re-enter";
            }
            else{
                userService
                    .register(username,password,firstName,lastName,admin)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user){
                                $location.url("/profile");
                            }
                        },
                        function (error) {
                            model.error = error.data;
                        }
                    );
            }
        }
    }
})();