import { Model } from './Model';
import { IView } from './IView';
import {Storage} from './Storage';

export class MyData {
    prop: number = 0;
    str: string = '';
}

export enum MyDataEvt {
    FOO = 'foo',
    BAR = 'bar'
}

class MyModel extends Model<MyData> {
    constructor(view: IView, storageObj: MyData) {
        super(view, storageObj);
    }

    public incProp() {
        this.storage.prop += 1;
        this.updateView({ prop: this.storage.prop });
    }

    public setProp(value: number) {
       this.setState({prop: value})
    }

    public setStr(str: string) {
        this.storage.str = str;
        this.updateView({str: this.storage.str});
    }

}

describe('Model', () => {
    let view: IView;
    let model: MyModel;
    let state: MyData;

    beforeEach(() => {
        view = { setState: (state: any) => null };
        const MyDataStorage = new Storage<MyData>(new MyData());
        state = MyDataStorage.state;
        model = new MyModel(view, MyDataStorage.state);
    })

    it('updateView', () => {
        spyOn(view, 'setState');
        model.incProp();
        expect(view.setState).toHaveBeenCalledWith({ prop: 1 });

        model.setStr('A');
        expect(view.setState).toHaveBeenCalledWith({ str: 'A' });
    });

    it('setState', () => {
        spyOn(view, 'setState');
        model.setProp(100);

        expect(view.setState).toHaveBeenCalledWith({ prop: 100 });
        expect(state.prop).toBe(100);

    });

    it('loadStorage', () => {
        model.incProp();
        model.setStr('B');
        spyOn(view, 'setState');
        model.loadStorage();
        expect(view.setState).toHaveBeenCalledWith({ prop: 1, str: 'B' });
    });
});
