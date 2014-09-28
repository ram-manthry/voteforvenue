angular.module('app', ['ngResource'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[{');
    $interpolateProvider.endSymbol('}]');
});

angular.module('app').config(function($locationProvider){
    $locationProvider.html5Mode(true);
});

angular.module('app').controller('mainCtrl',function($scope){
    $scope.myVar = "Angular!";
});