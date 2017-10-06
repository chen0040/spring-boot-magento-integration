(function(){
	var app = angular.module('xschen-angular-ui-module');
	
	var controller = function ($scope, $timeout, $uibModalInstance, $log, chartConfig, message, title, options) {
		  $scope.message = message;
		  $scope.title = title;
		  $scope.chartConfig = chartConfig;
		  $scope.options = options;
		  
		  $timeout(function(){
			  if($scope.chartConfig.build){
				  
				  $scope.chartConfig.build('chart', 'message');
			  }
		  }, 100);
		  
		  
		  $scope.backButtonClick = function(){
			  $uibModalInstance.close();
			  if($scope.options && $scope.options.backButton){
				  $scope.options.backButton.click();
			  }
		  }
	        
		
	
		  $scope.ok = function () {
			  $uibModalInstance.close();
		  };
	};
	
	
	app.controller('xschenChartDlgController',  ['$scope', '$timeout', '$uibModalInstance', '$log', 'chartConfig', 'message', 'title', 'options', controller]);
})();
