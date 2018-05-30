"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    setIdToWatch(watch) {
        const id = this.constructor.name;
        return watch(id);
    }
    loadStorage() {
        if (this.model) {
            this.model.loadStorage();
        }
        else {
            console.warn('loadStorage needs a model');
        }
    }
}
exports.Controller = Controller;
