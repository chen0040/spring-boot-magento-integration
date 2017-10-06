(function() {
    var service = function($log, $http, $timeout, xschenDialogService) {


        var userId = -1;
        var username = '';
        var userResume = null;

        var getUserById = function(userId, callback) {
            $http.get('/client/_search/users/userId/' + userId)
            .then(function(response){
                var user = response.data;
                if(callback) callback(user);
            });
        };

        var getUserId = function(callback) {
            if(userId == -1) {
                getUser(function(user) {
                    if(callback) callback(user.id);
                });
            } else {
                if(callback) callback(userId);
            }
        };

        var getUsername = function(callback) {
            if(username == '') {
                getUser(function(user) {
                   if(callback) callback(username);
                });
            } else {
                if(callback) callback(username);
            }
        };

        var getUser = function(callback) {
            $http.get('/client/user')
            .then(function(response){
                var user = response.data;
                userId = user.id;
                username = user.username;
                $log.debug(user);
                if(callback) callback(user);
            });
        };



        var saveUser = function(user, callback) {
            $http.post('/client/user', user, {headers: {'Content-Type': 'application/json'} })
                .then(function (response) {
                    $log.debug(response.data);
                    if(callback) callback(response.data);
                });
        };



        return {
            getUser : getUser,
            getUserId : getUserId,
            getUserById : getUserById,
            getUsername : getUsername,
            saveUser : saveUser,
        };
    };

    var module = angular.module('spring-magento-commons');
    module.factory('accountService', ['$log', '$http', '$timeout', 'xschenDialogService', service]);
})();
