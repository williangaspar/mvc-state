import { Model, IView } from 'mvc-state';
import { MyData } from '../../storage/MyData';

export class ViewData {
    data: {foo: number, bar: number}[] = [{foo: 0, bar: 0}]; 
}

export class ChartModel extends Model<MyData> {
    private viewData: ViewData;

    constructor(view: IView, storage: MyData) {
        super(view, storage);
        this.viewData = new ViewData();
    }

    public calcFoo(value: number) {
        this.viewData.data = this.viewData.data.map(item=>{
            item.foo = value * value;
            return item;
        });
        this.updateView(this.viewData);
    }

    public calcBar(value: number) {
        this.viewData.data = this.viewData.data.map(item=>{
            item.bar = value * 10;
            return item;
        });
        this.updateView(this.viewData);
    }
}