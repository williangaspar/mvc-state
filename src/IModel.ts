import { IView } from "./IView";

export interface IModel<T> {
    updateView(obj?: T | Object): void;
    // seal(view: IView, controller: Object, ...args: Storage[]): void;
}
