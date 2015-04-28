var debug = require('debug')('glimpse:planner:adapter-smartsheet');
var inherits = require('../utils/inherits');
var ModelProject = require('./model-project');
var InterfaceAdapter = require('./interface-adapter');

var AdapterSmartsheet = function () {};
inherits(AdapterSmartsheet, InterfaceAdapter);

AdapterSmartsheet.prototype.hydrateProjectModel = function (data) {
    var project = new ModelProject();
    project.id = data.id;
    project.title = data.name;
    project.link = data.permalink;

    return project;
};

module.exports = AdapterSmartsheet;