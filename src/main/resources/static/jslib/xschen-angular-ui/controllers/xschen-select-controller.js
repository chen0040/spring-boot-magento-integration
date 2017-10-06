(function(){
	var app = angular.module('xschen-angular-ui-module');
	
	var controller = function ($scope, $uibModalInstance, $log, list, title, listNames) {
		  $scope.list = list;
		  $scope.selectedItem = $scope.list[0];
		  $scope.title = title;
		  $scope.listNameMap = {};
		  
		  if(listNames){
			  for(var i=0; i < listNames.length; ++i){
				  $scope.listNameMap[list[i]]=listNames[i];  
			  }
			  
		  } else {
			  for(var i=0; i < list.length; ++i){
				  $scope.listNameMap[list[i]]=list[i];  
			  }
		  }
		
		  $scope.selectItem = function (item) {
			  $scope.selectedItem = item;
			  $uibModalInstance.close($scope.selectedItem);
		  };
	
		  $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
	};
	
	
	app.controller('xschenSelectController',  ['$scope', '$uibModalInstance', '$log', 'list', 'title', 'listNames', controller]);
})();
