import { IView } from "./IView";
import { IModel } from "./IModel";
import { IStorage } from "./IStorage";
import { Controller } from './Controller';

export class Model<T> implements IModel<T> {
    protected view: IView;
    protected storage: T;

    constructor(view: IView, storageObj: T) {
        this.view = view;
        this.storage = storageObj;
    }

    public updateView(obj?: T | Object): void {
        this.view.setState(obj);
    }
}