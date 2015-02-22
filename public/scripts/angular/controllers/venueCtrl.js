
function createVenueCtrl($scope,$http){

    var request = $http({
        method: "get",
        url: "api/venues"
    });

    request.then( function(venuesPromise){$scope.venues = venuesPromise.data; console.log(venuesPromise.data);} ) ;
};

angular.module('venueApp').controller('venueCtrl', createVenueCtrl);