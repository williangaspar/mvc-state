"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage = (function () {
    function Storage(state) {
        var _this = this;
        this.getWatch = function (id) {
            return function (variableName, callBack) {
                var list = _this.watchMap.get(variableName);
                if (list) {
                    var index = list.findIndex(function (item) { return item.id === id; });
                    if (index > -1) {
                        list[index] = { id: id, callBack: callBack };
                    }
                    else {
                        list.push({ id: id, callBack: callBack });
                    }
                }
                else {
                    _this.watchMap.set(variableName, [{ id: id, callBack: callBack }]);
                }
            };
        };
        this.emit = function (event, data) {
            var map = _this.watchMap.get(event);
            if (map)
                map.forEach(function (item) { return item.callBack(data); });
        };
        this.watchMap = new Map();
        this._state = {};
        this.initProps(state);
    }
    Storage.prototype.removeWatch = function (id) {
        var index = -1;
        this.watchMap.forEach(function (callBack) {
            index = callBack.findIndex(function (item) { return item.id === id; });
            if (index > -1) {
                callBack.splice(index, 1);
            }
        });
        return (index != -1);
    };
    Object.defineProperty(Storage.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Storage.prototype.initProps = function (state) {
        var _this = this;
        var props = Object.keys(state).map(function (key) { return key; });
        props.forEach(function (prop) { return _this.createGetAndSet(prop, state[prop]); });
    };
    Storage.prototype.createGetAndSet = function (key, value) {
        var _this = this;
        this._state['_' + key] = value;
        Object.defineProperty(this._state, key, {
            get: function () { return _this._state['_' + key]; },
            set: function (value) {
                _this._state['_' + key] = value;
                var map = _this.watchMap.get(key);
                if (map)
                    map.forEach(function (item) { return item.callBack(_this._state[key]); });
            },
        });
    };
    return Storage;
}());
exports.Storage = Storage;
//# sourceMappingURL=Storage.js.map