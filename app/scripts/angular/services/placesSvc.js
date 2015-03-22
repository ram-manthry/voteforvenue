(function () {

    angular.module('app.venue').factory('placesSvc', placesSvc);

    function placesSvc($http) {
        return {
            addPlace: addPlace
            , getPlaces: getPlaces
            , getPlaceInstance: getPlaceInstance
        };

        function getPlaces(eventId, callback, errorCallback) {
            $http({ method: "get", url: "/api/places/" + eventId })
                .then(function success_fnc(result) {
                    callback(result.data);
                }).catch(function error_fnc(result, status, headers, config) {
                    errorCallback({ data: result || "Request failed", status: status });
                });
        };

        function addPlace(placeObj, callback, errorCallback) {
            $http({ method: "post", url: "/api/places/addPlace", data: placeObj })
                .then(function success_fnc(result) {
                    callback(result.data);
                }).catch(function error_fnc(result, status, headers, config) {
                    errorCallback({ data: result || "Request failed", status: status });
                });
        };

        function getPlaceInstance() {
            return new PlaceObj(null, null, null, null);
        };

        function PlaceObj(name, loc, map, evtid) {
            return {
                eventId: evtid
                , name: name
                , location: loc
                , mapUrl: map
				, isValidObj: function placeCtrlPlaceObj_fnc() {
				    return (this.name && this.name.trim() !== '' && this.location && this.location.trim() !== ''); // && this.friends.length > 0);
				}
            }
        };
    };
})()