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
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map