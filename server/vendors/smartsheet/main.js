var debug = require('debug')('glimpse:smartsheet:main');
var inherits = require('../../utils/inherits');
var InterfaceTool = require('../../planner/interface-tool');
var SheetsAPI = require('./sheets-api');

var Smartsheet = function (opts) {
    opts = opts || {};

    this.apiKey = opts.apiKey;
    this.api = {
        sheets: new SheetsAPI({apiKey: this.apiKey})
    };
};
inherits(Smartsheet, InterfaceTool);

Smartsheet.prototype.listProjects = function (callback) {
    this.api.sheets.listAllSheets(callback);
};

Smartsheet.prototype.getProjectDetails = function () {
    return true;
};

module.exports = Smartsheet;