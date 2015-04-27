/**
 * sub should prototypally inherit from base
 * @param sub {function} Subclass constructor
 * @param base {function} Base class constructor
 */
module.exports = function (sub, base) {
    var Fn = function(){};
    Fn.prototype = base.prototype;
    sub.prototype = new Fn();
    sub.prototype.constructor = sub;
};