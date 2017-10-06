(function(){
	var app = angular.module('xschen-angular-ui-module');
	
	var controller = function ($scope, $uibModalInstance, $log, prompt, inputs, title) {
		  $scope.prompt = prompt;
		  $scope.inputs = inputs;
		  $scope.title = title;
		
		  $scope.ok = function () {				
			  $uibModalInstance.close($scope.inputs);
		  };
	
		  $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
	};
	
	
	app.controller('xschenInput2Controller',  ['$scope', '$uibModalInstance', '$log', 'prompt', 'inputs', 'title', controller]);
})();
