(function(){
    var controller = function($log, $scope, $location, userService, accountService, localeService, id) {
        if(id) {
            userService.getUserById(id, function(user) {
                $scope.user = user;
            });
        } else {
            var createdTime = new Date().getTime();
            $scope.user = {
                username: '',
                password: '',
                email: '',
                enabled: false,
                roles: "ROLE_USER",
                id: -1,
                createdBy: createdTime,
                lastUpdatedBy: createdTime,
                paid: 0
            };
        }



        function translate(tag) {
            return localeService.getText(tag);
        }




        $scope.updateUser = function() {
            userService.saveUser($scope.user, function(user){
                $scope.user = user;
                $location.path('admin/user-detail/'+$scope.user.id);
            });
        };

        $scope.cancelEditUser = function() {
            $location.path('admin/user-detail/'+$scope.user.id);
        }

    };

    var module = angular.module('spring-magento-admin');
    module.controller('userFormController', ['$log', '$scope', '$location', 'userService', 'accountService', 'localeService', 'id', controller]);
})();
