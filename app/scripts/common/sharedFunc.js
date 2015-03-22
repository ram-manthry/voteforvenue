var express = require('express');

function GenericResponse() {
    this.successResult = { success: true, message: "Success :)", code: 200, cache: false };
    this.errorResult = { success: false, message: 'Error has occured', code: 400, cache: false };
};

module.exports = GenericResponse;