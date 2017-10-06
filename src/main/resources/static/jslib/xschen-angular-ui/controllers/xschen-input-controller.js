(function(){
	var app = angular.module('xschen-angular-ui-module');
	
	var controller = function ($scope, $uibModalInstance, $log, prompt, inputValue, title) {
		  $scope.prompt = prompt;
		  $scope.title = title;
		  $scope.inputValue = inputValue;
		
		  $scope.ok = function () {
			  $uibModalInstance.close($scope.inputValue);
		  };
	
		  $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
	};
	
	
	app.controller('xschenInputController',  ['$scope', '$uibModalInstance', '$log', 'prompt', 'inputValue', 'title', controller]);
})();
