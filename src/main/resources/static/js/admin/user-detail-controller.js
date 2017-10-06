(function(){
    var controller = function($log, $scope, $location, userService, accountService, localeService, dateService, id) {

        function translate(tag) {
            return localeService.getText(tag);
        }

        userService.getUserById(id, function(user) {
            $scope.user = user;

        });


        $scope.editUser = function() {
            $location.path('admin/user-edit/' + id);
        };



    };

    var module = angular.module('spring-magento-admin');
    module.controller('userDetailController', ['$log', '$scope', '$location', 'userService', 'accountService', 'localeService', 'dateService', 'id', controller]);
})();
