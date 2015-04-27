var debug = require('debug')('glimpse:planner');
var Smartsheet = require('../vendors/smartsheet/main');

var Planner = function (opts) {
    opts = opts || {};

    this.apiKey = opts.apiKey;
    this.tool = this._toolFactory(opts);

    this.tool.listProjects(function (err, res, body) { console.log(body); });
};

/**
 * Constants
 **/
Planner.types = {
    SMARTSHEET: 'smartsheet'
};

/**
 * A factory method that will provide the right "tool"
 * instance such that you can just use in a (hopefully)
 * consistent manner, later
 * 
 * @param {Object} opts An object that will hold the options necessary
 * to figure out what instance type it should be and the details
 * for that tool's instantiation.
 * @param {Object} opts.type The "type" of project planning tool
 * @return {Class Object} An instance of the planning tool to use
 */
Planner.prototype._toolFactory = function (opts) {
    var tool;

    switch (opts.type) {
        case Planner.types.SMARTSHEET:
            tool = new Smartsheet(opts);
            break;
    }

    return tool;
};

module.exports = Planner;