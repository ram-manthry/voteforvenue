angular.module('app', ['ngResource'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[{');
    $interpolateProvider.endSymbol('}]');
});

angular.module('app').config(function($locationProvider){
    $locationProvider.html5Mode(true);
});

angular.module('app').controller('mainCtrl',function($scope,$http){

	var request = $http({
                        method: "get",
                        url: "api/events"
                    });
 
    request.then( function(eventsPromise){$scope.events = eventsPromise.data; } ) ;

});

angular.module('app').controller('venueCtrl',function($scope,$http){

    var request = $http({
        method: "get",
        url: "api/venues"
    });

    request.then( function(venuesPromise){$scope.venues = venuesPromise.data; console.log(venuesPromise.data);} ) ;

});
