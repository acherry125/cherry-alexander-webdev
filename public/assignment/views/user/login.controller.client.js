

(function() {
    angular
        .module("WebAppMaker")
        // naming controller and binding it to function
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        // referring to self (View Model)
        var vm = this;
        // verifies login credentials
        vm.login = login;

        // login handler
        function login(username, password) {
            if(verifyLogin(username, password)) {
                vm.info = "Checking for user...";
                UserService
                    .login(username, password)
                    // when the server responds
                    .then(
                        function(response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            var id = user._id;
                            $location.url("/user/" + id);
                        },
                        function(error) {
                            vm.info = "";
                            // figure out why this doesn't display
                            vm.error = "Invalid username password combination";
                        });
            } else {
                vm.error = "Please enter a Username and Password";
                vm.name_failure = true;
                vm.password_failure = true;
            }
        }

        function verifyLogin(username, password) {
            uClass = "form-group has-error";
            pClass = "form-group has-error";
            $("#username-wrap").attr("class", uClass);
            $("#password-wrap").attr("class", pClass);

            return (username && password);
        }
    }
})();