import { Controller, GetWatch, Watch } from 'mvc-state';
import { ChartModel } from './ChartModel';
import { MyDataEvt } from '../../storage/MyData';

export class ChartCtrl extends Controller {
    private model: ChartModel;

    constructor(model: ChartModel, getWatch: GetWatch) {
        super();
        this.model = model;
        const watch = this.setIdToWatch(getWatch);
        
        watch(MyDataEvt.FOO, (foo: number) => this.model.calcFoo(foo));
        watch(MyDataEvt.BAR, (bar: number) => this.model.calcBar(bar));
    };
}