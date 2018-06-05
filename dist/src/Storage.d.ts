import { IStorage, Unwatch, Listener, UnwatchAll } from './IStorage';
export declare class Storage<T> implements IStorage<T> {
    private watchMap;
    private _state;
    constructor(state: T);
    getWatch: (id: string) => (variableName: string, callBack: Function) => void;
    getUnwatch(id: string): Unwatch;
    getUnwatchAll(id: string): UnwatchAll;
    readonly state: T;
    emit: (event: string, data?: any) => void;
    getListernner: (id: string) => Listener;
    private initProps<T>(state);
    private createGetAndSet(key, value);
}
