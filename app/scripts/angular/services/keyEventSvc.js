(function () {

    angular.module('app.venue').factory('keyEventsSvc', keyEventsSvc);

    function keyEventsSvc() {
        return {
            keyUpEvent: function keyUpEvent_fnc(e, expectedValue, callbackFunc, f) {
                if (e.keyCode === expectedValue && f && f.trim() !== '')
                    callbackFunc(f);
            }
        };
    };

})()