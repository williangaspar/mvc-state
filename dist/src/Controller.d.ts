import { GetWatch, Watch, IController } from './IController';
export declare class Controller implements IController {
    setIdToWatch(watch: GetWatch): Watch;
    loadStorage(): void;
}
