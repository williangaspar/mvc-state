export type Watch = (variableName: string, callBack: Function) => any;
export type Unwatch = (variableName: string) => boolean;
export type UnwatchAll = () => any;
export type Emit = (event: string, data?: any) => void;

export interface IStorage<T> {
    getWatch(id: string): Watch;
    getUnwatch(id: string): Unwatch;
    emit: Emit;
    getListernner(id: string): Listener;
    readonly state: T
}

export interface Listener {
    watch: Watch;
    unwatch: Unwatch;
    unWatchAll: UnwatchAll;
}
