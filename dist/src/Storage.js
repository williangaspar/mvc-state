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
        this.getUnwatch = (id) => {
            return (variableName) => {
                const list = this.watchMap.get(variableName);
                if (list) {
                    const index = list.findIndex((item) => item.id === id);
                    if (index > -1) {
                        list.splice(index, 1);
                        return true;
                    }
                }
                return false;
            };
        };
        this.getUnwatchAll = (id) => {
            return () => {
                this.watchMap.forEach((value, key) => {
                    const list = this.watchMap.get(key);
                    if (list) {
                        const index = list.findIndex((item) => item.id === id);
                        if (index > -1) {
                            list.splice(index, 1);
                            return true;
                        }
                    }
                });
                return false;
            };
        };
        this.emit = (event, data) => {
            const map = this.watchMap.get(event);
            if (map)
                map.forEach((item) => item.callBack(data));
        };
        this.getListener = (id) => {
            const watch = this.getWatch(id);
            const unwatch = this.getUnwatch(id);
            const unwatchAll = this.getUnwatchAll(id);
            return { watch, unwatch, unwatchAll };
        };
        this.watchMap = new Map();
        this._state = {};
        this.initProps(state);
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
