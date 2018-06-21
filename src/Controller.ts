import { GetWatch, Watch, IController } from './IController';

export class Controller implements IController {
    public setIdToWatch(watch: GetWatch): Watch {
        const id = this.constructor.name;
        return watch(id);
    }

    public loadStorage() {
        if ((this as any).model) {
            (this as any).model.loadStorage();
        } else {
            console.warn('loadStorage needs a model');
        }
    }
}
