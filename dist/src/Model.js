"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor(view, storageObj) {
        this.view = view;
        this.storage = storageObj;
    }
    updateView(obj) {
        this.view.setState(obj);
    }
    loadStorage() {
        const props = Object.keys(this.storage)
            .filter(key => key.indexOf('$_') == -1)
            .map((key) => key);
        let obj = {};
        props.forEach((prop) => obj[prop] = this.storage[prop]);
        this.view.setState(obj);
    }
}
exports.Model = Model;
