(function(){
    var controller = function($http, $log, $filter, $scope, $location, accountService, catalogueService, xschenDialogService, localeService, categoryId, id) {
        var vm = this;
        $scope.id = id;
        $scope.categoryId = categoryId;

        vm.activate = function() {
            if($scope.id == null) {
                $scope.product = new sunray.Product('', $http);
                $scope.product.type_id = 'simple';
                $scope.product.status = 1;
                $scope.product.price = 100;
                $scope.product.name = '';
            } else {
                $scope.product = new sunray.Product($scope.id, $http);
                $scope.product.load();
            }
            if($scope.categoryId != -1) {
                catalogueService.getCategoryById($scope.categoryId, function(c){
                    $scope.categories = c.children_data;
                    console.log(c);
                    $scope.categoryTitle = c.name;
                });
            }
        };



        $scope.updateProduct = function(){
            if(!$scope.product.sku || $scope.product.sku == '' || $scope.product.name == '') {
                alert('Please enter a valid product SKU');
                return;
            }
            catalogueService.checkSku($scope.product.sku, function(p){
                if(p) {
                    alert('The product SKU ' + $scope.product.sku + ' is already in use, please enter a new one');
                } else {
                    $scope.product.saveToCategory(categoryId, function(){
                        $location.path('/catalogue-detail/' + $scope.product.sku);
                    });
                }
            });

        };

        $scope.cancel = function() {
            $location.path('/catalogue-detail/' + id);
        };

        vm.activate();

    };

    var module = angular.module('spring-magento-commons');
    module.controller('catalogueFormController', ['$http', '$log', '$filter', '$scope', '$location', 'accountService', 'catalogueService', 'xschenDialogService', 'localeService', 'categoryId', 'id', controller]);
})();
