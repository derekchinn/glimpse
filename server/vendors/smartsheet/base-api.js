var debug = require('debug')('glimpse:smartsheet:baseApi');
var path = require('path');
var request = require('request');

/**
 * An abstract base API class to inherit from such that each
 * API class knowns what it's base API url is.. which is really an
 * extension of the top level wrapper's url building function.
 * @abstract class
 * 
 * @param {Class Object} _parent The parent that defines what the base
 * API url looks like (most like the guy who defines the function _buildBaseUrl)
 * @param {String} _suffix The additional path to append to the base url to form
 * the API's base url
 * @param {String} _version The version number of the API. Most of the time this
 * should be set by the parent class.. but just in case the API version starts
 * to drift from the version, we allow you to adjust if need be.
 */
var BaseAPI = function (opts) {
    opts = opts || {};

    this.suffix;
    this.version;
    this.apiKey = opts.apiKey;


    this.baseApiUrl = this.buildApiBaseUrl();
    this.request = this.getRequestInstance();
};

/**
 * Construct the base url with the option to use a particular
 * version if need be.
 * 
 * @param  {String} ver Version number for the API string
 * @return {String} url
 */
BaseAPI.prototype._buildBaseUrl = function (ver) {
    // default should be latest according to Smartsheet's docs
    ver = ver || '1.1';

    return 'https://api.smartsheet.com/' + ver;
};

/**
 * Builds the base url API path by appending the identified suffix
 * to the base url supplied by the parent url builder.
 * 
 * @return {String} The base url with the API's suffix appended
 */
BaseAPI.prototype.buildApiBaseUrl = function () {
    return this._buildBaseUrl(this.version) + '/' + this.suffix;
};

/**
 * Generate the access token for the header and save it to the
 * internal variable.
 * 
 * @return {String}
 */
BaseAPI.prototype._generateAccessToken = function () {
    return 'Bearer ' + this.apiKey;
};

/**
 * Generate a request instance with the access token as a default
 * so that we don't have to set it on every request.
 * 
 * @return {Request}
 */
BaseAPI.prototype.getRequestInstance = function () {
    return request.defaults({headers: {Authorization: this._generateAccessToken()}});
};

module.exports = BaseAPI;