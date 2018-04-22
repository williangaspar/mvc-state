"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = (function () {
    function Controller() {
    }
    Controller.prototype.setIdToWatch = function (watch) {
        var id = this.constructor.name;
        return watch(id);
    };
    Controller.prototype.loadStorage = function () {
        if (this.model) {
            this.model.loadStorage();
        }
        else {
            console.warn('loadStorage needs a model');
        }
    };
    return Controller;
}());
exports.Controller = Controller;
