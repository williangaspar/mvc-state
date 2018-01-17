export interface IController {
    setIdToWatch(watch: GetWatch): Watch;
}
export declare type GetWatch = (id: string) => Watch;
export declare type Watch = (variableName: string, callBack: Function) => any;
