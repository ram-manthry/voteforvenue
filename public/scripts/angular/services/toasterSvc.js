angular.module('venueApp').factory('notificationSvc', function (toaster) {
    return {
        success: function notificationSuccess_fnc (text) {
            console.log(text);
            toaster.success("", text);
        },
        error: function notificationError_fnc (text) {
            console.log(text);
            toaster.error("", text);
        },
        warning: function notificationWarnig_fnc (text) {
            toaster.pop('warning', "", text);
        },

        displayNotification : function notification_fnc(isSuccess, message, code) {        
            //else notification.warning("Http Code not supported.");
            if (isSuccess)
                notification.success(message);
            else
                notification.error(message);
        }
    };
});