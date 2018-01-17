import { Controller, GetWatch, Watch } from 'mvc-state';
import { InputModel } from './InputModel';

export class InputCtrl extends Controller {
    private model: InputModel;

    constructor(model: InputModel) {
        super();
        this.model = model;
    }

    public onIncFoo = () => {
        this.model.incFoo(1);
    }

    public onIncBar = () => {
        this.model.incBar(1);
    }

    public onDecFoo = () => {
        this.model.incFoo(-1);
    }

    public onDecBar = () => {
        this.model.incBar(-1);
    }
}