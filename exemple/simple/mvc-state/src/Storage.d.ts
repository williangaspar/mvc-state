import { IStorage } from './IStorage';
export declare class Storage<T> implements IStorage<T> {
    private watchMap;
    private _state;
    constructor(state: T);
    getWatch: (id: string) => (variableName: string, callBack: Function) => void;
    removeWatch(id: string): boolean;
    readonly state: T;
    emit: (event: string, data?: any) => void;
    private initProps<T>(state);
    private createGetAndSet(key, value);
}
