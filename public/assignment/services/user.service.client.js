// angular function
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;

        /* Adds a new user to the database */
        function createUser(user) {
            users.push(user);
        }

        /* Finds a user by its id */
        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        /* Finds a user by its username */
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        /* Find a user by its username and password */
        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        /* Update a user with new information */
        function updateUser(userId, user) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    return;
                }
            }
        }

        /* Delete a user */
        function deleteUser(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    return;
                }
            }
            return -1;
        }
    }

})();