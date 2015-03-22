
(function () {

	angular.module('app.venue').factory('eventSvc', eventService);

	function eventService($http) {

		return {
			getEvents: getEvents,
			createEvent: createEvent,
			getEventInstance: getEventInstance
		};

		function getEvents(callback, errorCallback) {
			$http({ method: "get", url: "/api/events" })
				.then(function success_fnc(result) {
					callback(result.data.events);
				})
				.catch(function error_fnc(result, status) {
					errorCallback({ data: result || "Request failed", status: status });
				});
		};

		function createEvent(eventObj, callback, errorCallback) {
			console.log(eventObj);
			$http({ method: "post", url: "/api/events/add", data: eventObj })
				.then(function success_fnc(result) {
					callback(result.data);
				}).catch(function error_fnc(result, status, headers, config) {
					errorCallback({ data: result || "Request failed", status: status });
				});
		};

		function getEventInstance() {
			return new EventObj(null, 'Event Date', 'Voting ends On', [], null, null);
		};

		function EventObj(t, ed, ve, f, ei, id) {
			return {
				eventId: id
				, title: t
				, eventDate: ed
				, votingEndsOn: ve
				, friends: f
				, eventImage: ei
				, isValidObj: function eventCtrlEventObj_fnc() {
					return (this.title && this.title.trim() !== '' && this.eventDate && this.votingEndsOn); // && this.friends.length > 0);
				}
			}
		};

	};

}) ()