"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedirectURI = exports.getRedirectLocation = void 0;
// for dev
const redirectLocations = {
    "main": '/',
    "pdtalk": '/pdtalk',
    "card": '/card',
};
function getRedirectLocation(locationURI) {
    return "http://pandarrativ.com/credential?location=" + locationURI;
}
exports.getRedirectLocation = getRedirectLocation;
function getRedirectURI(locationURI) {
    return "/credential?location=" + locationURI;
}
exports.getRedirectURI = getRedirectURI;
function validateRedirectUri(redirectKey) {
    if (redirectLocations.hasOwnProperty(redirectKey)) {
        return redirectLocations[redirectKey];
    }
    else {
        return false;
    }
}
exports.default = validateRedirectUri;
