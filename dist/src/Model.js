"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = (function () {
    function Model(view, storageObj) {
        this.view = view;
        this.storage = storageObj;
    }
    Model.prototype.updateView = function (obj) {
        this.view.setState(obj);
    };
    Model.prototype.loadStorage = function () {
        var _this = this;
        var props = Object.keys(this.storage).map(function (key) { return key; });
        var obj = {};
        props.forEach(function (prop) { return obj[prop] = _this.storage[prop]; });
        this.view.setState(obj);
    };
    return Model;
}());
exports.Model = Model;
