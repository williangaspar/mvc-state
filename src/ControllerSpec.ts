import { Model } from './Model';
import { IView } from './IView';

import { Controller } from './Controller';

interface IMyInterface {
    prop: number;
    str: string;
}

class MyController extends Controller {
    public model: any = { loadStorage: () => 'storage' };
}

describe('Controller', () => {
    let controller: MyController;

    beforeEach(() => {
        controller = new MyController();
    })

    it('loadStorage', () => {
        spyOn(controller.model, 'loadStorage');
        controller.loadStorage();
        expect(controller.model.loadStorage).toHaveBeenCalled();
    });

    it('loadStorage - log error', () => {
        controller.model = null;
        spyOn(console, 'warn');
        controller.loadStorage();
        expect(console.warn).toHaveBeenCalledWith('loadStorage needs a model');
    });
});
