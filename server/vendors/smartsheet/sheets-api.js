var debug = require('debug')('glimpse:smartsheet:sheetApi');
var inherits = require('../../utils/inherits');
var BaseAPI = require('./base-api');

/**
 * API wrapper for the "Sheets" endpoint.
 * @class
 * @extends BaseAPI
 * 
 * @param {Object} opts Options object
 * @param {Object} opts.parent A reference to the parent object that instantiated
 * this instance. It's necessary for when you need to be able to build the API's
 * base url.
 */
var SheetsAPI = function (opts) {
    opts = opts || {};

    this.suffix = 'sheet';
    this.parent = opts.parent || {};

    BaseAPI.call(this, opts);
};
inherits(SheetsAPI, BaseAPI);

SheetsAPI.prototype.listAllSheets = function (callback) {
    var url = this.baseApiUrl + 's';
    return this.request.get(url, callback);
};

module.exports = SheetsAPI;