(function(){
	var app = angular.module('xschen-angular-ui-module');
	
	var controller = function ($scope, $uibModalInstance, $log, table, title, options) {
		  $scope.table = table;
		  
		  $scope.title = title;
		  
		  $scope.sortColumn = -1;
		  $scope.sortReverse  = false;  // set the default sort order
		  
		  $scope.options = options;
		  
		  
		
		  $scope.selectItem = function (item) {
			  //$scope.selectedItem = item;
			  //$uibModalInstance.close($scope.selectedItem);
		  };
		  
		  $scope.backButtonClick = function(){
			  $uibModalInstance.dismiss('back');
			if($scope.options && $scope.options.backButton){
				$scope.options.backButton.click();
			}  
		  };
		  
		  $scope.getTableArray = function(){
			  if($scope.table == undefined) return [['"No Available Data"']];
				var csv = [];
				if($scope.table.headers != undefined){
					csv.push($scope.headers);
				}
				for(var i=0; i < $scope.table.data.length; ++i){
					var row = $scope.table.data[i].data;
					var row2 = [];
					for(var j=0; j < row.length; ++j){
						row2.push(row[j]);
					}
					csv.push(row2);
				}
				return csv;
		  };
		  
		  var sort = function(table){
			  if(table.data.length > 0){
				  table.data.sort(function(a, b){
					 var aVal = a.data[$scope.sortColumn]; 
					 var bVal = b.data[$scope.sortColumn];
					 
					 var result = 1;
					 if(aVal > bVal){
						 result = 1;
					 } else if(aVal < bVal){
						 result = -1;
					 } else {
						 result = 0;
					 }
					 
					 return $scope.sortReverse ? result : -result;
				  });
			  }
		  };
		  
		  
		  $scope.setSortColumn = function(index){
			  $scope.sortColumn = index;
			  $scope.sortReverse = !$scope.sortReverse;
			  sort(table);
		  }
		  
		  
	
		  $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
		  
		  if($scope.table.defaultSortColumn != undefined){
			  $scope.sortColumn = $scope.table.defaultSortColumn;
			  sort($scope.table);
		  }
	};
	
	
	app.controller('xschenTableController',  ['$scope', '$uibModalInstance', '$log', 'table', 'title', 'options', controller]);
})();
