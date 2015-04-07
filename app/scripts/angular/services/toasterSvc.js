angular.module('app.venue').factory('notificationSvc', function (toaster) {
    return {
        success: function notificationSuccess_fnc (text) {
            toaster.success("", text);
        },
        error: function notificationError_fnc (text) {
            toaster.error("", text);
        },
        warning: function notificationWarnig_fnc (text) {
            toaster.pop('warning', "", text);
        },
        displayNotification : function notification_fnc(isSuccess, message, code) {
            // else notification.warning("Http Code not supported.");
            if (isSuccess)
                this.success(message);
            else
                this.error(message);
        }
    };
});