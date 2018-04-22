import { IView } from "./IView";

export interface IModel<T> {
    updateView(obj?: T | Object): void;
    loadStorage(): void;
}
