import { IView } from "./IView";
import { IModel } from "./IModel";
export declare class Model<T> implements IModel<T> {
    protected view: IView;
    protected storage: T;
    constructor(view: IView, storageObj: T);
    updateView(obj?: T | Object): void;
    setState(obj?: Object | T): void;
    loadStorage(): void;
}
