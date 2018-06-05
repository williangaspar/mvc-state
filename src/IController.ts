export interface IController {
    setIdToWatch(watch: GetWatch): Watch;
}

export type GetWatch = (id: string) => Watch;

export type Watch = (variableName: string, callBack: Function) => any;
