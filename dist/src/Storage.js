"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Storage {
    constructor(state) {
        this.getWatch = (id) => {
            return (variableName, callBack) => {
                const list = this.watchMap.get(variableName);
                if (list) {
                    const index = list.findIndex((item) => item.id === id);
                    if (index > -1) {
                        list[index] = { id, callBack };
                    }
                    else {
                        list.push({ id, callBack });
                    }
                }
                else {
                    this.watchMap.set(variableName, [{ id, callBack }]);
                }
            };
        };
        this.emit = (event, data) => {
            const map = this.watchMap.get(event);
            if (map)
                map.forEach((item) => item.callBack(data));
        };
        this.watchMap = new Map();
        this._state = {};
        this.initProps(state);
    }
    removeWatch(id) {
        let index = -1;
        this.watchMap.forEach((callBack) => {
            index = callBack.findIndex((item) => item.id === id);
            if (index > -1) {
                callBack.splice(index, 1);
            }
        });
        return (index != -1);
    }
    get state() {
        return this._state;
    }
    initProps(state) {
        const props = Object.keys(state).map((key) => key);
        props.forEach((prop) => this.createGetAndSet(prop, state[prop]));
    }
    createGetAndSet(key, value) {
        this._state['_' + key] = value;
        Object.defineProperty(this._state, key, {
            get: () => this._state['_' + key],
            set: (value) => {
                this._state['_' + key] = value;
                const map = this.watchMap.get(key);
                if (map)
                    map.forEach((item) => item.callBack(this._state[key]));
            },
        });
    }
}
exports.Storage = Storage;
