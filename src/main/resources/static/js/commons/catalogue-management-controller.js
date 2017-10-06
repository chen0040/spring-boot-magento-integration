(function(){
    var controller = function($http, $log, $scope, $location, $timeout, accountService, catalogueService, xschenDialogService, messageService, dateService, localeService, tag) {

        var vm = this;

        $scope.categories = [];
        $scope.categoryTitle = 'Loading ...';
        $scope.products = [];
        $scope.tag = tag;
        $scope.pageSize = 10;
        $scope.pager = new sunray.Pager();

        vm.activate = function() {

            accountService.getUser(function(user){
                $scope.user = user;
                console.log(user);
                if(user.enabled) {
                    loadCategories();
                    loadProducts();
                }
            });
        };

        function loadCategories() {
            if($scope.tag == 'all'){
                catalogueService.getCategories(function(categories){
                    $scope.categories = categories;
                    console.log(categories);
                    $scope.categoryTitle = 'All Categories';
                });
            } else {
                catalogueService.getCategoryById($scope.tag, function(c){
                    $scope.categories = c.children_data;
                    console.log(c);
                    $scope.categoryTitle = c.name;
                });
            }
        }

        function loadProducts() {
            $scope.pageLoading = true;
            if($scope.tag == 'all') {
                catalogueService.getProducts(function(data) {
                    $scope.pageLoading = false;
                    $scope.products = [];
                    for(var i=0; i < data.length; ++i){
                        $scope.products.push(new sunray.Product(data[i].sku, $http));
                    }
                    $scope.pager.load($scope.products);
                });
            } else {
                catalogueService.getProductsInCategory($scope.tag, function(data) {
                    $scope.pageLoading = false;
                    $scope.products = [];
                    for(var i=0; i < data.length; ++i){
                        $scope.products.push(new sunray.Product(data[i].sku, $http));
                    }
                    $scope.pager.load($scope.products);
                });
            }
        }

        $scope.goBack = function() {
            window.history.back();
        };

        $scope.newProduct = function() {
            $location.path('/catalogue-create/' + $scope.tag);
        };

        vm.activate();
    };

    var module = angular.module('spring-magento-commons');
    module.controller('catalogueManagementController', ['$http', '$log', '$scope', '$location', '$timeout', 'accountService', 'catalogueService', 'xschenDialogService', 'messageService','dateService', 'localeService', 'tag', controller]);
})();
