(function () {

    angular.module('app.venue').controller('placesCtrl', ['$scope', '$stateParams', '$timeout', 'placesSvc', 'voteSvc', 'notificationSvc', 'keyEventsSvc', placesCtrl]);
    
    function placesCtrl($scope, params, $timeout, placesSvc, voteSvc, notificationSvc, keyEventsSvc) {
        var vm            = this;
        vm.placeObj       = placesSvc.getPlaceInstance();
        vm.places         = [];
        vm.eventId        = params.id;
        vm.eventName      = params.name;
        vm.name           = null;
        vm.getPlaces      = getPlaces;
        vm.addPlace       = addPlace;
        vm.vote           = voteForPlace;
        vm.disabledVotes  = false;

        vm.getPlaces();

        function getPlaces() {
            if (vm.eventId) {
                placesSvc.getPlaces(vm.eventId, function getPlaces_callback(data) {
                    vm.places = data.result;
                }, errorCallback);
            
                $timeout(function getPlaces_timeout() {                
                    if (vm.places.length > 0)
                        voteSvc.getVotes(vm.eventId, getPlaceVotes, errorCallback);
                }, 1500);
            };
        };

        function addPlace(placeObj) {
            if (!placeObj.isValidObj()) {
                notificationSvc.warning("Name and location are required");
                return false;
            };
            var data = {
                eventId   : vm.eventId
                , name    : placeObj.name
                , location: placeObj.location
                , mapUrl  : placeObj.mapUrl
            };
            placesSvc.addPlace(data, function addPlace_callback(result) {
                notificationSvc.displayNotification(result.success, result.message, result.code);
                vm.placeObj = placesSvc.getPlaceInstance();
                vm.getPlaces();
            }, errorCallback);
            
        };

        function getPlaceVotes(dt) {

            vm.places.forEach(function (e, j, list) {
                list[j].isTheUserVote = false;
                list[j].hasVoteResponse = true;

                if (list[j].quantityOfVotes === undefined || list[j].quantityOfVotes === null) {
                    list[j].quantityOfVotes = 0;
                };

                if (dt.result && dt.result.length > 0) {
                    dt.result.forEach(function (v, i, arr) {                        
                        if (arr[i].placeId === list[j]._id) {
                            list[j].quantityOfVotes += 1;
                            if (arr[i].isTheUserVote) list[j].isTheUserVote = arr[i].isTheUserVote;
                        };
                    });
                };
            });
        };

        function voteForPlace(place) {
            if (vm.disabledVotes) {
                notificationSvc.warning("You've already voted ;) ");
                return;
            }
            if (place && place.eventId) {
                var data = { eventId: place.eventId, placeId: place._id };
                voteSvc.voteFor(data, function voteFor_callback(result) {
                    if (result.success) {
                        setVotesForSpecificPlace(place._id);
                        place.disabled = true;
                        vm.disabledVotes = true;
                    } else if (result.code === 304) {
                        notificationSvc.warning(result.message);
                    } else if (result.code === 407) {
                        notificationSvc.warning(result.message);                        
                        eval(face.fbLogin());
                    } else {
                        notificationSvc.displayNotification(false, "Your vote was not computed.", 500);
                    }
                }, errorCallback);
            };
        };

        function errorCallback(errorObj) {
            notificationSvc.displayNotification(false, "Error has occured in Place page", 500);
        };

        function setVotesForSpecificPlace(placeId) {
            vm.places.forEach(function (e, i, arr) {
                arr[i].hasVoteResponse = true;
                if (arr[i]._id === placeId) {
                    if (!arr[i].quantityOfVotes) arr[i].quantityOfVotes = 1;
                    else arr[i].quantityOfVotes += 1;
                }
            });
        };
    };
    
}) ()