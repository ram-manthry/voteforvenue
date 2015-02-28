angular.module('venueApp').factory('eventSvc', function (toaster) {
    function EventObj(t, ed, ve, f, ei) {
        return {
            title: t
            , eventDate: ed
            , votingEndsOn: ve
            , friends: f
            , eventImage: ei
            , isValidObj: function eventCtrlEventObj_fnc() {
                return (this.title && this.title.trim() !== '' && this.eventDate && this.votingEndsOn); // && this.friends.length > 0);
            }
        }
    };
    return {
        CreateNewEvent: function CreateNewEvent_fnc() {
            return new EventObj(null, 'Event Date', 'Voting ends On', [], null)
        }        
    }   
});