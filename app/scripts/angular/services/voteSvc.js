(function () {

    angular.module('app.venue').factory('voteSvc', voteSvc);

    function voteSvc($http) {
        return {
            getVotes: getVotes,
            voteFor: voteFor
        };

        function getVotes(eventId, callback, errorCallback) {
            //console.log(placeId);
            $http({ method: "get", url: "/api/voting/" + eventId })
                .then(function success_fnc(result) {
                    callback(result.data);
                }).catch(function error_fnc(result, status, headers, config) {
                    errorCallback({ data: result || "Request failed", status: status });
                });
        };

        function voteFor(vote, callback, errorCallback) {
            //console.log(vote);
            $http({ method: "post", url: "/api/voting/addVote", data: vote })
                .then(function success_fnc(result) {
                    callback(result.data);
                }).catch(function error_fnc(result, status, headers, config) {
                    errorCallback({ data: result || "Request failed", status: status });
                });
        };
    };
})()