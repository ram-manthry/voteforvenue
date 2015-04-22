
(function () {

    angular.module('app.venue').controller('eventCtrl', eventCtrl);

    eventCtrl.$inject = ['$scope', '$http', '$location', 'eventSvc', 'notificationSvc', 'keyEventsSvc'];

    function eventCtrl(sc, $http, $location, eventSvc, notificationSvc, keyEventsSvc) {
        var vm              = this;
        vm.events           = [];
        vm.friend           = null;
        vm.format           = 'dd-MMMM-yyyy';        
        vm.eventObj         = eventSvc.getEventInstance();
        vm.minDate          = vm.minDate ? null : new Date();
        
        vm.addFriend        = addFriend;
        vm.getEvents        = getEvents;
        vm.createEvent      = createEvent;
        vm.openEventDate    = openEventDate;
        vm.openVotingEndsOn = openVotingEndsOn;
        vm.keyUpEvent       = keyEventsSvc.keyUpEvent;
        vm.dateOptions      = { formatYear: 'yyyy', formatMonth: 'MMMM', startingDay: 0, top: '100px' };

        vm.getEvents();
        
        function getEvents() {
            eventSvc.getEvents(function getEvents_callback(data) {
                vm.events = data;
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
                    vm.eventObj = eventSvc.getEventInstance();
                    vm.getEvents();
            }, function createEvent_errorCallback(errorObj) {
                    console.log(errorObj);
                    notificationSvc.displayNotification(false, "Error has occured creating the Venue", 500);
                });

            return false;
        };
                
        function addFriend(f) {
            if (f && f !== null) {
                vm.eventObj.friends.push({ order: vm.eventObj.friends.length, value: f });
                vm.friend = null;
            }
        };

        function openEventDate($event) {
            vm.openedVotingEndsOn = false;
            vm.openedEventDate = true;
            $event.preventDefault();
            $event.stopPropagation();
        };

        function openVotingEndsOn($event) {
            vm.openedEventDate = false;
            vm.openedVotingEndsOn = true;
            $event.preventDefault();
            $event.stopPropagation();
        };
    };

}) ()
