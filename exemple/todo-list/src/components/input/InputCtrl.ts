import { Controller, GetWatch, Watch } from 'mvc-state';
import { InputModel } from './InputModel';

export class InputCtrl extends Controller {
    private model: InputModel;

    constructor(model: InputModel) {
        super();
        this.model = model;
    }

    public onChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.model.updateView({ title: event.currentTarget.value });
    }

    public onAdd = (title: string, event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.model.add(title);
    }
}