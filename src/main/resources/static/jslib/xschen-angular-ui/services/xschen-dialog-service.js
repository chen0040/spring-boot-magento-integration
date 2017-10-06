(function(){
	var app = angular.module('xschen-angular-ui-module');

	var service = function($log, $uibModal){

		var spin = function(message, title){
			var size = 'lg';

			var modalInstance = $uibModal.open({
			     animation: true,
			     template: "<div><div class='modal-header modal-header-info'><h3 class='modal-title'>{{title}}</h3></div><div class='modal-body'><div class='row'><uib-progressbar class='progress-striped active' value='100' type='info' style='margin-top:20px;margin-bottom:20px;margin-left:10px;margin-right:10px;'>{{message}}</uib-progressbar></div></div></div>",
			     controller: 'xschenMsgController',
			     size: size,
			     backdrop : 'static',
			     windowClass: 'center-modal',
			     resolve: {
			       message: function () {
			         return message;
			       },
			       title: function() {
			    	   return title;
			       }
			     }
			   });


			return modalInstance;
		};

		var warn = function(message) {
		    toastr.options.positionClass = "toast-top-right";
		    toastr.options.closeButton = true;
		    toastr.warning(message);
		};

		var alert = function(message, title, callback) {
		    toastr.options.positionClass = "toast-top-right";
            toastr.options.closeButton = true;
		    if(title) {
                toastr.error(message, title);
            } else {
                toastr.error(message, 'Spring-Magento Alert!!');
            }

		};

		var msg = function(message, title, callback){
		    if(callback) {
                toastr.options.onHidden = callback;
            } else {
                toastr.options.onHidden = null;
            }
		    toastr.options.positionClass = "toast-top-right";
        	toastr.options.closeButton = true;
		    if(title) {
		        toastr.success(message, title);
		    } else {
		        toastr.success(message, 'Spring-Magento likes you to know');
		    }
		    toastr.options.onHidden = null;

		    /*
			var size = 'lg';

			var modalInstance = $uibModal.open({
			     animation: true,
			     template: "<div><div class='modal-header modal-header-primary'><h3 class='modal-title'>{{title}}</h3></div><div class='modal-body'>{{message}}</div><button class='btn btn-primary' type='button' ng-click='ok()'>OK</button></div></div>",
			     controller: 'xschenMsgController',
			     size: size,
			     backdrop : 'static',
			     resolve: {
			       message: function () {
			         return message;
			       },
			       title: function() {
			    	   return title;
			       }
			     }
			   });

			modalInstance.result.then(function () {
		      if(callback) callback();
		    }, function () {
		      $log.debug('Msg dismissed at: ' + new Date());
		    });*/
		};

		var chartDlg = function(chartConfig, message, title, callback, options){
			var size = 'lg';

			var dialogTemplate = "<div><div class='modal-header modal-header-primary'><h3 class='modal-title'>{{title}}</h3></div><div class='modal-body'><span id='message'>{{message}}</span> <br /><div style='height:480px;width:100%' ng-if='chartConfig && chartConfig.options && chartConfig.data' ><nvd3 id='chartCanvas' options='chartConfig.options' data='chartConfig.data'></nvd3></div><div id='chart' style='width:800px;height:480px;' ng-show='chartConfig && !chartConfig.options'></div></div><div class='modal-footer'><button class='btn btn-warning' ng-click='backButtonClick()' type='button' ng-if='options && options.backButton'>Back</button><button class='btn btn-primary' type='button' ng-click='ok()'>OK</button></div></div>";

			var modalInstance = $uibModal.open({
			     animation: true,
			     template: dialogTemplate,
			     controller: 'xschenChartDlgController',
			     size: size,
			     backdrop : 'static',
			     resolve: {
			       message: function () {
			         return message;
			       },
			       title: function() {
			    	   return title;
			       },
			       chartConfig: function(){
			    	   return chartConfig;
			       },
			       options: function(){
			    	   return options;
			       }
			     }
			   });

			modalInstance.result.then(function () {
		      if(callback) callback();
		    }, function () {
		      $log.debug('Msg dismissed at: ' + new Date());
		    });
		};

		var confirm = function(message, title, callback){
			var size = 'lg';

			var modalInstance = $uibModal.open({
			     animation: true,
			     template: "<div><div class='modal-header modal-header-primary'><h3 class='modal-title'>{{title}}</h3></div><div class='modal-body'>{{message}}</div><div class='modal-footer'><button class='btn btn-primary' type='button' ng-click='ok()'>OK</button><button class='btn btn-warning' type='button' ng-click='cancel()'>Cancel</button></div></div>",
			     controller: 'xschenConfirmController',
			     size: size,
			     backdrop : 'static',
			     resolve: {
			       message: function () {
			         return message;
			       },
			       title: function() {
			    	   return title;
			       }
			     }
			   });

			modalInstance.result.then(function () {
		      callback();
		    }, function () {
		      $log.debug('Confirm dismissed at: ' + new Date());
		    });
		};

		var input = function(prompt, inputValue, title, callback){
			var size = 'lg';

			var modalInstance = $uibModal.open({
			     animation: true,
			     template: "<div><div class='modal-header modal-header-primary'><h3 class='modal-title'>{{title}}</h3></div><div class='modal-body'><div style='margin:10px'><div class='row'><label for='inputValue'>{{prompt}}</label><input id='inputValue' type='text' class='form-control' ng-model='inputValue' /></div></div></div><div class='modal-footer'><button class='btn btn-primary' type='button' ng-click='ok()'>OK</button><button class='btn btn-warning' type='button' ng-click='cancel()'>Cancel</button></div></div>",
			     controller: 'xschenInputController',
			     size: size,
			     backdrop : 'static',
			     resolve: {
			       prompt: function () {
			         return prompt;
			       },
			       inputValue: function(){
			    	   return inputValue;
			       },
			       title: function() {
			    	   return title;
			       }
			     }
			   });

			modalInstance.result.then(function (inputValue) {
		      callback(inputValue);
		    }, function () {
		      $log.debug('Input dismissed at: ' + new Date());
		    });
		};

		var multiInputs = function(prompt, inputs, title, callback){
			var size = 'lg';

            var template = "<div>" +
            "   " +
            "        <div class=\"modal-header modal-header-primary\">" +
            "            <h3 class=\"modal-title\">{{title}}</h3>" +
            "        </div>" +
            "        <div class=\"modal-body\">" +
            "        	<div style=\"margin:10px\">" +
            "	        	<div class=\"row\">{{prompt}}</div>" +
            "	        	" +
            "	        	<div class=\"form-group row\">" +
            "	        	" +
            "	        		<div class=\"row\" ng-repeat=\"input in inputs track by $index\">" +
            "                        <div class=\"col-md-12\">" +
            "                            <label for=\"inputValue\">{{input.name}}</label>" +
            "                            <input type=\"text\" class=\"form-control\"  id=\"inputValue\" ng-model=\"input.value\" />" +
            "                        </div>" +
            "					</div>" +
            "	            </div>" +
            "	            " +
            "				 " +
            "	        	" +
            "            </div>" +
            "        </div>" +
            "        <div class=\"modal-footer\">" +
            "            <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>" +
            "            <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>" +
            "        </div>" +
            "</div>";

			var modalInstance = $uibModal.open({
			     animation: true,
			     template: template,
			     controller: 'xschenInput2Controller',
			     size: size,
			     resolve: {
			       prompt: function () {
			         return prompt;
			       },
			       inputs: function(){
			    	   return inputs;
			       },
			       title: function() {
			    	   return title;
			       }
			     }
			   });

			modalInstance.result.then(function (inputs) {
		      callback(inputs);
		    }, function () {
		      $log.debug('multiInputs dismissed at: ' + new Date());
		    });
		};

		var select = function(list, title, callback, listNames, enabled){

			if(list.length==1 || (enabled != undefined && !enabled)){
				if(callback) callback(list[0]);
			} else {
				var size = 'lg';

                var template = "<div>" +
                "   " +
                "        <div class=\"modal-header modal-header-primary\">" +
                "            <h3 class=\"modal-title\">{{title}}</h3>" +
                "        </div>" +
                "        <div class=\"modal-body\">" +
                "        	<div style=\"margin-top:10px;margin-left:10px;margin-right:10px;\">" +
                "        	Please click one of the item below to select" +
                "        	</div>" +
                "             <div style=\"margin:10px;height:360px;overflow:auto;\">" +
                "			      <table style=\"width:100%\">" +
                "			      	<tr ng-repeat=\"item in list | orderBy\">" +
                "			      		<td><i class=\"glyphicon glyphicon-th-list\"></i> <a ng-click=\"selectItem(item)\" class=\"btn\">{{listNameMap[item]}}</a></td>" +
                "			      	</tr>" +
                "			      </table>" +
                "		      </div>" +
                "        </div>" +
                "        <div class=\"modal-footer\">" +
                "            <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Close</button>" +
                "        </div>" +
                "</div>";

				var modalInstance = $uibModal.open({
				     animation: true,
				     template: template,
				     controller: 'xschenSelectController',
				     size: size,
				     resolve: {
				       list: function () {
				         return list;
				       },
				       title: function() {
				    	   return title;
				       },
				       listNames: function(){
				    	   return listNames;
				       }
				     }
				   });

				modalInstance.result.then(function (selectedItem) {
			      if(callback) callback(selectedItem);
			    }, function () {
			      $log.debug('Select dismissed at: ' + new Date());
			    });
			}


		};

		var table = function(table, title, callback, options){
			var size = 'lg';

			var modalInstance = $uibModal.open({
			     animation: true,
			     template: "<div><div class='modal-header modal-header-primary'><h3 class='modal-title'>{{title}}</h3><button class='btn btn-warning' type='button' ng-click='cancel()'>Close</button></div></div>",
			     controller: 'xschenTableController',
			     size: size,
			     backdrop : 'static',
			     resolve: {
			       table: function () {
			         return table;
			       },
			       title: function() {
			    	   return title;
			       },
			       options: function(){
			    	   return options;

			       }
			     }
			   });

			modalInstance.result.then(function (selectedItem) {
		      if(callback) callback(selectedItem);
		    }, function () {
		      $log.debug('Table dismissed at: ' + new Date());
		    });
		};



		return {
			confirm : confirm,
			select : select,
			input : input,
			alert : alert,
			multiInputs : multiInputs,
			msg : msg,
			warn : warn,
			table : table,
			spin : spin,
			chartDlg : chartDlg
		};
	};


	app.factory('xschenDialogService', ['$log', '$uibModal', service]);
})();
