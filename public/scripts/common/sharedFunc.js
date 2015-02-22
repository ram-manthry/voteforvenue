var express = require('express');

function VenueResponse() {
    this.successResult = { success: true, message: "Success :)", code: 200, cache: false };
    this.errorResult = { success: false, message: 'Error has occured', code: 400, cache: false };
};

module.exports = new VenueResponse();