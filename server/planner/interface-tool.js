/**
 * An interface that all tools for a "planner" should
 * implement.
 */
var InterfaceTool = function () {};

InterfaceTool.prototype.listProjects = function () {
    throw 'listProjects() unimplemented!';
};

InterfaceTool.prototype.getProjectDetails = function (id) {
    throw 'getProjectDetails() unimplemented!';
};

module.exports = InterfaceTool;