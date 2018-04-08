"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = (function () {
    function Controller() {
    }
    Controller.prototype.setIdToWatch = function (watch) {
        var id = this.constructor.name;
        return watch(id);
    };
    return Controller;
}());
exports.Controller = Controller;
