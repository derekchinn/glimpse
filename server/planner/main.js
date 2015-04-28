var debug = require('debug')('glimpse:planner:main');
var Smartsheet = require('../vendors/smartsheet/main');
var AdapterSmartsheet = require('./adapter-smartsheet');

var Planner = function (opts) {
    opts = opts || {};

    this.adapter = {};
    this.apiKey = opts.apiKey;
    this.tool = {};

    this._toolFactory(opts);
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
    switch (opts.type) {
        case Planner.types.SMARTSHEET:
            this.tool = new Smartsheet(opts);
            this.adapter = new AdapterSmartsheet();
            break;
    }

    return this;
};

Planner.prototype.getProjects = function (callback) {
    var self = this;
    this.tool.listProjects(function (err, res, body) { 
        if (err) {
            console.log('Error fetching project data.');
            return callback(new Error('Failed to fetch project data.'));
        }

        var projects = [];
        var body = JSON.parse(body);
        for (var i = 0, len = body.length; i < len; i++) {
            projects.push(self.adapter.hydrateProjectModel(body[i]));
        }

        callback(null, projects);
    });
};

module.exports = Planner;