export interface IController {
    setIdToWatch(watch: GetWatch): Watch;
    loadStorage(): void;
}
export declare type GetWatch = (id: string) => Watch;
export declare type Watch = (variableName: string, callBack: Function) => any;
