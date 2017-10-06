(function(){
    var controller = function($route, $log, $scope, $location, $sce, accountService, catalogueService, localeService, dateService, xschenDialogService, id) {

        $scope.id = id;
        catalogueService.getProductBySku(id, function(product) {
            $scope.product = product;
        });

        $scope.editProduct = function(){
            $location.path('/catalogue-edit/' + $scope.id);
        };

        $scope.uploadProductImage = function() {
            var hasProductImage = catalogueService.hasProductImage();
            if(hasProductImage) {
                catalogueService.uploadProductImage($scope.id, function(result) {
                    if(result.success) {
                        xschenDialogService.msg('Your Image has been uploaded: ' + result.id, 'Image Uploaded');
                        $route.reload();
                    } else {
                        xschenDialogService.alert(reason, 'Upload Error');
                    }
                });
            } else {
                clefDialogService.alert('Please select your image to upload First!', 'Invalid Upload');
            }
        };

        $scope.uploadProductModel = function() {
            var hasProductModel = catalogueService.hasProductModel();
            if(hasProductModel) {
                catalogueService.uploadProductModel($scope.id, function(result) {
                    if(result.success) {
                        xschenDialogService.msg('Your 3D model (Android) has been uploaded: ' + result.id, 'Model Uploaded');
                    } else {
                        xschenDialogService.alert(reason, 'Upload Error');
                    }
                });
            } else {
                clefDialogService.alert('Please select your image to upload First!', 'Invalid Upload');
            }
        };

        $scope.uploadProductModel2 = function() {
            var hasProductModel = catalogueService.hasProductModel2();
            if(hasProductModel) {
                catalogueService.uploadProductModel2($scope.id, function(result) {
                    if(result.success) {
                        xschenDialogService.msg('Your 3D model (iOS) has been uploaded: ' + result.id, 'Model Uploaded');
                    } else {
                        xschenDialogService.alert(reason, 'Upload Error');
                    }
                });
            } else {
                clefDialogService.alert('Please select your image to upload First!', 'Invalid Upload');
            }
        };

        $scope.deleteProduct = function() {
            catalogueService.deleteProduct($scope.id, function(response){
                console.log(response);
                $location.path('/catalogue-manage');
            });
        };

    };

    var module = angular.module('spring-magento-commons');
    module.controller('catalogueDetailController', ['$route', '$log', '$scope', '$location', '$sce', 'accountService', 'catalogueService', 'localeService', 'dateService', 'xschenDialogService', 'id', controller]);

    module.directive('productImageUpload', ['catalogueService', function (catalogueService) {
        return {
            restrict: 'A',
            scope : {
                productImage : "=ngModel"
            },
            link: function (scope, element, attr) {

                element.bind('change', function () {
                    catalogueService.storeProductImage(element[0].files[0]);
                });

            }
        };
    }]);

    module.directive('productModelUpload', ['catalogueService', function (catalogueService) {
        return {
            restrict: 'A',
            scope : {
                productModel : "=ngModel"
            },
            link: function (scope, element, attr) {

                element.bind('change', function () {
                    catalogueService.storeProductModel(element[0].files[0]);
                });

            }
        };
    }]);

    module.directive('productModel2Upload', ['catalogueService', function (catalogueService) {
        return {
            restrict: 'A',
            scope : {
                productModel2 : "=ngModel"
            },
            link: function (scope, element, attr) {

                element.bind('change', function () {
                    catalogueService.storeProductModel2(element[0].files[0]);
                });

            }
        };
    }]);
})();
