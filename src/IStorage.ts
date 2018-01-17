export type Watch = (variableName: string, callBack: Function) => any;


export interface IStorage<T> {
    getWatch(id: string): Watch;
    removeWatch(id: string): boolean;
    emit(event: string, data?: any): void;
    readonly state: T
}