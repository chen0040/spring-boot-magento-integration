(function(){
    var app = angular.module('spring-magento-client', [
    'ui.bootstrap', 'ui.bootstrap.treeview',
    'ngRoute', 'ngSanitize',
    'xschen-angular-ui-module',
    'angular-json-tree', 'kendo.directives', 'spring-magento-commons']);
    var controller = function($log, $scope, $http, $rootScope, $location, socketService, accountService, messageService, localeService) {
        var vm = this;

        vm.activate = function() {
            accountService.getUserId(function(userId){
                socketService.connect(userId, function(state, message){
                    messageService.route(state, message);
                });
            });

            localeService.loadVocabulary();
        };



        $('.dropdown').hover(function() {
            $(this).addClass('open');
        },
        function() {
            $(this).removeClass('open');
        });

        $('ul li').click(function(){
            $(this).addClass('active');
            $(this).parent().parent().parent().parent().children().children().children().children().not(this).removeClass('active');
            $(this).parent().parent().parent().parent().children().children().children().children().not(this).children().children().removeClass('active');
        });

        $('.navbar-header').click(function(){
            $(this).siblings().children('ul').children('li').removeClass('active');
            $(this).siblings().children('ul').children('li').children().children().removeClass('active');
        })

        $scope.logout = function() {
            $http.post('/logout', {}).then(function(response) {
                $log.debug(response);
                window.location="/";
            });
        };

        vm.activate();
    };

    app.config(function($routeProvider, $logProvider) {
         // uncomment the line below can disable printout in the console
         $logProvider.debugEnabled(true);
         $routeProvider

             .when('/catalogue-manage', {
                 templateUrl : 'html/commons/catalogue-management',
                 controller  : 'catalogueManagementController',
                 resolve: {
                   tag : ['$route', function($route) { return 'all'; }]
                 }
             })

             .when('/catalogue-manage/:tag', {
                 templateUrl : 'html/commons/catalogue-management',
                 controller  : 'catalogueManagementController',
                 resolve: {
                   tag : ['$route', function($route) { return $route.current.params.tag; }]
                 }
             })

             .when('/catalogue-detail/:id', {
                 templateUrl : 'html/commons/catalogue-detail',
                 controller  : 'catalogueDetailController',
                 resolve: {
                   id : ['$route', function($route) { return $route.current.params.id; }]
                 }
             })


             .when('/catalogue-edit/:id', {
                 templateUrl : 'html/commons/catalogue-form',
                 controller  : 'catalogueFormController',
                 resolve: {
                   id : ['$route', function($route) { return $route.current.params.id; }],
                   categoryId: function() { return -1; }
                 }
             })

              .when('/catalogue-create/:categoryId', {
                  templateUrl : 'html/commons/catalogue-form',
                  controller  : 'catalogueFormController',
                  resolve: {
                    id : [function() { return null; }],
                    categoryId: ['$route', function($route) { return $route.current.params.categoryId; }]
                  }
              })

              .when('/account', {
                  templateUrl : 'html/commons/account',
                  controller  : 'accountController'
              })


             .otherwise({
                     templateUrl : 'html/commons/catalogue-management',
                     controller : 'catalogueManagementController',
                     resolve: {
                      tag : ['$route', function($route) { return 'all'; }]
                     }
              });
         });

    app.controller("clientNavController", ['$log', '$scope', '$http', '$rootScope', '$location', 'socketService', 'accountService', 'messageService', 'localeService', controller]);

})();
