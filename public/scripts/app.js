var app =  angular.module('app', ['ngResource'], function ($interpolateProvider) 
{
        $interpolateProvider.startSymbol('[{');
        $interpolateProvider.endSymbol('}]');
    });

app.config(function($locationProvider){
    $locationProvider.html5Mode(true);
});

app.controller('mainCtrl',function($scope,$http,$location){

	var request = $http({
                        method: "get",
                        url: "api/events"
                    });
 
    request.then( function(eventsPromise){$scope.events = eventsPromise.data; } ) ;

    $scope.redirectRoute = function(url){        
        window.location = url;
    };


});

app.controller('venueCtrl',function($scope,$http){

    var request = $http({
        method: "get",
        url: "api/venues"
    });

    request.then( function(venuesPromise){$scope.venues = venuesPromise.data; console.log(venuesPromise.data);} ) ;

});
