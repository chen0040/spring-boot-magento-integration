(function(){
	var app = angular.module('xschen-angular-ui-module');
	
	var controller = function ($scope, $uibModalInstance, $log, message, title) {
		  $scope.message = message;
		  $scope.title = title;
		
		  $scope.ok = function () {
			  $uibModalInstance.close();
		  };
	
		  $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
	};
	
	
	app.controller('xschenConfirmController',  ['$scope', '$uibModalInstance', '$log', 'message', 'title', controller]);
})();
