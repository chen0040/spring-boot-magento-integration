(function(){
	var app = angular.module('xschen-angular-ui-module');
	
	var controller = function ($scope, $uibModalInstance, $log, message, title) {
		  $scope.message = message;
		  $scope.title = title;
		
	
		  $scope.ok = function () {
			  $uibModalInstance.close();
		  };
	};
	
	
	app.controller('xschenMsgController',  ['$scope', '$uibModalInstance', '$log', 'message', 'title', controller]);
})();
