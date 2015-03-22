(function () {

    angular.module('app.venue').config(['$stateProvider', '$urlRouterProvider', "$locationProvider", routeCfg]);
    function routeCfg($stateProvider, $urlRouterProvider, $locationProvider) {
        
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('index');
        
        $stateProvider
            .state('place', {
                cache: false,
                url: '/place/:id?name',
                templateUrl: 'partial/place.html',
                controller: 'placesCtrl'
            })
            .state('index', {
                cache: false,
                url: '/index',
                templateUrl: 'partial/event.html',
                controller: 'eventCtrl',
            })
    };

    //angular.module('app.venue').config(['$routeProvider', routeCfg]);
    //function routeCfg($routeProvider) {
        
    //    $routeProvider
    //        .when('/index', {
    //            templateUrl: 'partial/event.html',
    //            controller: 'placesCtrl'            
    //        })
    //};

})()