
function createEventCtrl($scope, $http, $location, eventSvc, notificationSvc) {
    $scope.events = [];
    $scope.eventObj = eventSvc.CreateNewEvent();
	$scope.format = 'dd-MMMM-yyyy';
	$scope.friend = null;

	$scope.addFriend = function eventCtrlAddFriend_fnc(f){		
		$scope.eventObj.friends.push({order: $scope.eventObj.friends.length, value: f});
		$scope.friend = null;

	}

	$scope.createEvent = function eventCtrlCreateEvent_fnc(eventObj) {
	    if (!eventObj.isValidObj()) {
	        notification.error("Venue requires a title, friends and event Data");
	        return false;
	    }
        
	    $http({method: "post", url: "/event/api/events/add",
		    data: {
		        title: eventObj.title
                , eventDate: eventObj.eventDate
                , votingEndsOn: eventObj.votingEndsOn
                , friends: eventObj.friends
                , eventImage: eventObj.eventImage
		    }
		}).success( function(eventsPromise, status, headers, config) {
		    notificationSvc.displayNotification(eventsPromise.success, eventsPromise.message, eventsPromise.code);
			$scope.eventObj = eventSvc.CreateNewEvent();
			$scope.getEvents();
		}).error(function(data, status, headers, config){
		    console.log(data);
		    console.log(status);
		    notificationSvc.displayNotification(false, "Error has occured creating the Venue", 500);
		});
    };

    $scope.getEvents = function eventCtrlCreateEvent_fnc() {
		$http({ method: "get", url: "/event/api/events"})
			.then( function(eventsPromise) {
				console.log(eventsPromise);
				$scope.events = eventsPromise.data.events;
			});
    };       

	function generateDataPicker(evtObj) {
		$scope.today = function() {
			if($scope.opened){
			    $scope.eventObj.eventDate = new Date();
			    $scope.eventObj.votingEndsOn = new Date();
			}
		};

		$scope.today();

		$scope.clear = function () {
			//$scope.eventDate = null;
			//$scope.votingEndsOn = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return false;
			//return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.toggleMin();

		$scope.open = function($event, property) {
			$event.preventDefault();
			$event.stopPropagation();
			switch(property) {
			    case $scope.eventObj.eventDate: $scope.openedEventDate = true; break;
			    case $scope.eventObj.votingEndsOn: $scope.openedVotingEndsOn = true; break;
			}
		};

		$scope.dateOptions = {
			formatYear: 'yyyy',
			formatMonth: 'MMMM',
			startingDay: 0,
			top: '150px'
		};

		$scope.format = 'dd-MMMM-yyyy';
	};

	$scope.getEvents();	
	generateDataPicker($scope.eventObj);

};
angular.module('venueApp').controller('eventCtrl', createEventCtrl);

