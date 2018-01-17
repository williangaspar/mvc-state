import { IModel } from './IModel';
import { GetWatch, Watch, IController,  } from './IController';

export class Controller implements IController {
    public setIdToWatch(watch: GetWatch): Watch {
        const id = this.constructor.name;
        return watch(id);
    }
}