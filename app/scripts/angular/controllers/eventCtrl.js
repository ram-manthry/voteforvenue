
(function () {

    angular.module('app.venue').controller('eventCtrl', eventCtrl);

    function eventCtrl($scope, $http, $location, eventSvc, notificationSvc, keyEventsSvc) {
        $scope.events = [];
        $scope.friend = null;
        $scope.format = 'dd-MMMM-yyyy';        
        $scope.eventObj = eventSvc.getEventInstance();
        $scope.minDate = $scope.minDate ? null : new Date();        
        $scope.dateOptions = { formatYear: 'yyyy', formatMonth: 'MMMM', startingDay: 0, top: '100px' };

        $scope.addFriend = addFriend;
        $scope.createEvent = createEvent;
        $scope.getEvents = getEvents;
        $scope.keyUpEvent = keyEventsSvc.keyUpEvent;
        $scope.openEventDate = openEventDate;
        $scope.openVotingEndsOn = openVotingEndsOn;

        $scope.getEvents();
        
        function getEvents() {
            eventSvc.getEvents(function getEvents_callback(events) {
                    $scope.events = events;
                });
        }

        function createEvent(eventObj) {
            if (!eventObj.isValidObj()) {
                notificationSvc.warning("Venue requires a title, friends and event Data");
                return false;
            }

            var data = {
                    title         : eventObj.title
                    , eventDate   : eventObj.eventDate
                    , votingEndsOn: eventObj.votingEndsOn
                    , friends     : eventObj.friends
                    , eventImage  : eventObj.eventImage
            };

            eventSvc.createEvent(data, function createEvent_callback(events) {
                    notificationSvc.displayNotification(events.success, events.message, events.code);
                    $scope.eventObj = eventSvc.getEventInstance();
                    $scope.getEvents();
            }, function createEvent_errorCallback(errorObj) {
                    console.log(errorObj);
                    notificationSvc.displayNotification(false, "Error has occured creating the Venue", 500);
                });

            return false;
        };
                
        function addFriend(f) {
            $scope.eventObj.friends.push({ order: $scope.eventObj.friends.length, value: f });
            $scope.friend = null;
        };

        function openEventDate($event) {
            $scope.openedVotingEndsOn = false;
            $scope.openedEventDate = true;
            $event.preventDefault();
            $event.stopPropagation();
        };

        function openVotingEndsOn($event) {
            $scope.openedEventDate = false;
            $scope.openedVotingEndsOn = true;
            $event.preventDefault();
            $event.stopPropagation();
        };
    };

}) ()
