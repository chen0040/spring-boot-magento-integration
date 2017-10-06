(function(){
    var controller = function($log, $scope, $location, userService, xschenDialogService, localeService) {
        var vm = this;
        $scope.users = [];

        function translate(tag) {
            return localeService.getText(tag);
        }

        vm.activate = function(){
            userService.getUsers(function(users){
                 $scope.users = users;
                 $('#userGrid').kendoGrid({
                         dataSource: {
                             data: $scope.users,
                             pageSize: 10
                         },
                         sortable: true,
                         scrollable: true,
                         pageable: {
                              refresh: true,
                              pageSizes: true,
                              buttonCount: 5
                         },
                         editable: false,
                         columns: [
                             { field: "rowNum",title: "#",width: "50px", template: "<span class='row-number'></span>"},
                             { hidden:true,field: "id", title: "id", width: "50px"},
                             { field: "username", title: translate("site.username"), width: "150px" },
                             { field: "email", title:"Email", width: "150px"},
                             { field: "roles", title:"Roles", width: "100px"},
                             { field: "Activated",title:"Activated", width: "100px",
                                  template: function(dataItem){
                                        if(dataItem.enabled){
                                            return '<input type="checkbox" class="ob-box" onclick="return false" checked/>';
                                        } else {
                                            return '<input type="checkbox" class="ob-box" onclick="return false"/>';
                                        }
                                  }
                             },
                             { command: { name: "View", click: view}, title: " ", width:"80px"},
                             { command: { name: "Delete", click: deleteUser}, title: " ", width:"80px"}
                         ],
                         dataBound: function () {
                             var rows = this.items();
                             $(rows).each(function () {
                                 var index = $(this).index() + 1;
                                 var rowLabel = $(this).find(".row-number");
                                 $(rowLabel).html(index);
                             });
                         }
                 });

                 updateView();
             })

             cleanupKGrid();
        };

        function showGrid(data) {
            if($scope.users) {
                var grid = $('#userGrid').data("kendoGrid");
                grid.setDataSource(new kendo.data.DataSource(
                    {
                    data: data,
                    pageSize: 10
                }));
            }
        }

        function updateView() {
            userService.getUsers(function(users){
                $scope.users = users;
                $scope.suggestions = [];
                for(i=0;i<users.length;i++){
                    users[i].roles = userService.changeRole(users[i].roles);
                    $scope.suggestions.push(users[i].username);
                }
                showGrid(users);
            });
        }

        function refresh() {
            userService.getUsers(function(users){
                $scope.users = users;
                $scope.suggestions = [];
                for(i=0;i<users.length;i++){
                    users[i].roles = userService.changeRole(users[i].roles);
                    $scope.suggestions.push(users[i].username);
                }
            });
        }


        function view(e){
            var tr = $(e.target).closest("tr");
            var item = this.dataItem(tr);
            $location.path('admin/user-detail/'+item.id);
            cleanupKGrid();
            refresh();
        };


         function deleteUser(e){
             var tr = $(e.target).closest("tr");
             var item = this.dataItem(tr);
            xschenDialogService.confirm('User deletion is irreversible action, are you sure you want to continue?', 'User deletion confirmation', function() {
                userService.delUserById(item.id, function(response){
                    if(!response.deleted) {
                        // commenting this line out cause 'let' is buggy on firefox and safari
                        // let reason = response.reason;
                        xschenDialogService.msg(response.reason, 'User deletion canceled');
                    } else {
                        // commenting this line out cause 'let' is buggy on firefox and safari
                        // let message = response.username + " and associated company " + response.company + " is deleted";
                        xschenDialogService.msg((response.username + " and associated company " + response.company + " is deleted"), 'User deletion completed');
                        updateView();
                    }
                });
            });
         };

         function cleanupKGrid() {

             // remove all the default href tags in ".k-grid a" elements
             if ($(".k-grid a.k-button").attr("href") == "#") {
                 $(".k-grid a.k-button").removeAttr("href");
             }

             // disables all buttons (by CSS) if grid is empty
             if ($scope.users.length==0) {
                 $(".k-grid a.k-button").addClass("k-state-disabled");
             }

             // enable both header and body to scroll-x together
             $("#csvGrid .k-grid-header-wrap").scroll(function() {
                 var left = $(this).scrollLeft();
                 var wrap = $("#csvGrid > .k-grid-content");
                 if (wrap.scrollLeft() != left) wrap.scrollLeft(left);
             });
         }

        $scope.searching = false;
        $scope.searchItem = '';
        $scope.sortType     = 'username';
        $scope.sortReverse  = false;
        $scope.searchUser = function(name){
            userService.getUsers(function(users){
                $scope.users.splice(0,$scope.users.length);
                $scope.searching = true;
                for(i=0;i<users.length;i++){
                    if(users[i].username.indexOf(name)>=0){
                        users[i].roles = userService.changeRole(users[i].roles);
                        $scope.users.push(users[i]);
                    }
                }
                showGrid($scope.users)
            });
        }

        $scope.exitSearch = function(){
            $scope.users.splice(0,$scope.users.length);
            $scope.searching = false;
            updateView();
        }
         $scope.createUser = function() {
             $location.path('admin/user-create');
         };

         $scope.delUser = function(id) {

            xschenDialogService.confirm('User deletion is irreversible action, are you sure you want to continue?', 'User deletion confirmation', function() {

                userService.delUserById(id, function(response){
                    if(!response.deleted) {
                        // commenting the bottom 2 lines out cause "let" is giving issue in Firefox and Safari
                        //let reason = response.reason;
                        xschenDialogService.msg(response.reason, 'User deletion canceled');
                    } else {
                        //let message = response.username + " and associated company " + response.company + " is deleted";
                        xschenDialogService.msg((response.username + " and associated company " + response.company + " is deleted"), 'User deletion completed');
                        updateView();
                    }

                });

            });

         };

        vm.activate();
    };

    var module = angular.module('spring-magento-admin');
    module.controller('userManagementController', ['$log', '$scope', '$location', 'userService', 'xschenDialogService', 'localeService', controller]);
})();
