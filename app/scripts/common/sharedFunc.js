var express = require('express');

function GenericResponse() {
    this.Result = {};
    this.successResult           = { success: true, message: "Success :)", code: 200, cache: false };
    this.authenticationResult    = { success: false, message: "Authentication Required", code: 407, cache: false };
    this.warningResult           = { success: false, message: "Warning", code: 304, cache: false };
    this.errorResult             = { success: false, message: 'Error has occured', code: 400, cache: false };
};

module.exports = GenericResponse;