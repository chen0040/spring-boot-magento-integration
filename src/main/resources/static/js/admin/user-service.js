(function(){
    var service = function($log, $http) {
        var getUserById = function(id, callback) {
             $http.get("/admin/users/"+id)
            .then(function(response) {
                $log.debug(response.data);
                if(callback) callback(response.data);
            });
        };

        var getUsers = function(callback) {

            $http.get("/admin/users")
            .then(function(response) {
                $log.debug(response.data);
                if(callback) callback(response.data);
            });
        }

        var delUserById = function(id, callback) {
            $http.delete("/admin/users/"+id)
            .then(function(response) {
                $log.debug(response.data);
                if(callback) callback(response.data);
            });
        };

        var saveUser = function(user, callback) {
             $http.post("/admin/users", user, {headers: {'Content-Type': 'application/json'} })
            .then(function (response) {
                $log.debug(response.data);
                if(callback) callback(response.data);
            });
        };

        var changeRole = function(role){
            var roleString;
            if(role.indexOf("ADMIN")>=0){
                roleString = "Admin User";
            } else if(role.indexOf("DEMO") > 0) {
                roleString = "Demo User";
            } else {
                roleString = "Basic User";
            }

            return roleString;
        }

        return {
            getUserById : getUserById,
            getUsers : getUsers,
            delUserById : delUserById,
            changeRole: changeRole,
            saveUser : saveUser
        };
    };

    var module = angular.module('spring-magento-admin');
    module.factory('userService', ['$log', '$http', service]);
})();
