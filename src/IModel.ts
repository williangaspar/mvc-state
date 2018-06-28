export interface IModel<T> {
    updateView(obj?: T | Object): void;
    setState(obj?: T | Object): void;
    loadStorage(): void;
}
