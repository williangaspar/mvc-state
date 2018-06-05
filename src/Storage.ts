import { IStorage, Watch, Unwatch, Emit, Listener, UnwatchAll } from './IStorage';

interface IMapFunction {
    id: string;
    callBack: Function;
}

export class Storage<T> implements IStorage<T> {
    private watchMap: Map<string, IMapFunction[]>;
    private _state: any;

    constructor(state: T) {
        this.watchMap = new Map();
        this._state = {};
        this.initProps(state);
    }

    public getWatch = (id: string) => {
        return (variableName: string, callBack: Function) => {
            const list = this.watchMap.get(variableName);
            if (list) {
                const index = list.findIndex((item) => item.id === id);

                if (index > -1) {
                    // replace existing watcher with a new one
                    list[index] = { id, callBack }
                } else {
                    // new watcher
                    list.push({ id, callBack });
                }

            } else {
                // New variable
                this.watchMap.set(variableName, [{ id, callBack }]);
            }
        }
    }

    public getUnwatch(id: string): Unwatch {
        return (variableName: string) => {
            const list = this.watchMap.get(variableName);
            if (list) {
                const index = list.findIndex((item) => item.id === id);
                if (index > -1) {
                    list.splice(index, 1);
                    return true;
                }
            }
            return false;
        }
    }

    public getUnwatchAll(id: string): UnwatchAll {
        return () => {
            this.watchMap.forEach((value: any, key: string) => {
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
        }
    }

    public get state(): T {
        return this._state;
    }

    public emit = (event: string, data?: any): void => {
        const map = this.watchMap.get(event)
        if (map)
            map.forEach((item) => item.callBack(data));
    }

    public getListerner = (id: string): Listener => {
        const watch = this.getWatch(id);
        const unwatch = this.getUnwatch(id);
        const unWatchAll = this.getUnwatchAll(id);
        return { watch, unwatch, unWatchAll };
    }

    private initProps<T>(state: T) {
        const props = Object.keys(state).map((key) => key);
        props.forEach((prop) => this.createGetAndSet(prop, (state as any)[prop]));
    }

    private createGetAndSet(key: string, value: any) {
        (this._state as any)['_' + key] = value;

        Object.defineProperty(this._state, key, {
            get: () => (this._state as any)['_' + key],
            set: (value: any) => {
                (this._state as any)['_' + key] = value;

                const map = this.watchMap.get(key)
                if (map)
                    map.forEach((item) => item.callBack(this._state[key]));
            },
        });
    }
}
