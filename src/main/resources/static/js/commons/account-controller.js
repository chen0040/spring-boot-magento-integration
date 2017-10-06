(function(){
    var controller = function($log, $location, $scope, $timeout, accountService, xschenDialogService, localeService, dateService) {
        var vm = this;

        $scope.companyLogo = null;
        $scope.user = null;

        function translate(tag) {
            return localeService.getText(tag);
        }

        $scope.confirmPassword = {
            value: ""
        };

        vm.activate = function() {
            loadUserStatus();
        };

        function loadUserStatus() {
            accountService.getUser(function(user){
                $scope.user = user;
                $scope.confirmPassword.value = user.password;
            });
        }


        $scope.updateUser = function() {
            if($scope.confirmPassword.value == $scope.user.password){
                 accountService.saveUser($scope.user, function(user) {
                     xschenDialogService.msg("Update saved!");
                 });
            }
            else{
                  alert("Passwords do not match");
            }
        };



        vm.activate();
    };

    var module = angular.module('spring-magento-commons');
    module.controller('accountController', ['$log', '$location', '$scope', '$timeout', 'accountService', 'xschenDialogService', 'localeService', 'dateService', controller]);

    module.directive('resumeUpload', ['accountService', function (accountService) {
        return {
            restrict: 'A',
            scope : {
                resume : "=ngModel"
            },
            link: function (scope, element, attr) {

                element.bind('change', function () {
                    accountService.storeResume(element[0].files[0]);
                });

            }
        };
    }]);


})();
