import { IStorage } from './IStorage';

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
                    list[index] = { id, callBack }
                } else {
                    list.push({ id, callBack });
                }

            } else {
                this.watchMap.set(variableName, [{ id, callBack }]);
            }
        }
    }

    public removeWatch(id: string): boolean {
        let index = -1;
        this.watchMap.forEach((callBack) => {
            index = callBack.findIndex((item) => item.id === id);
            if (index > -1) {
                callBack.splice(index, 1);
            }
        });
        return (index != -1);
    }

    public get state(): T {
        return this._state;
    }

    public emit = (event: string, data?: any): void  => {
        const map = this.watchMap.get(event)
        if (map)
            map.forEach((item) => item.callBack(data));
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