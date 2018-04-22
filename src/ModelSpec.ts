import { Model } from './Model';
import { IView } from './IView';

interface IMyInterface {
    prop: number;
    str: string;
}

class MyModel extends Model<IMyInterface> {
    constructor(view: IView, storageObj: IMyInterface) {
        super(view, storageObj);
    }

    public incProp() {
        this.storage.prop += 1;
        this.updateView({ prop: this.storage.prop });
    }

    public setStr(str: string) {
        this.storage.str = str;
        this.updateView(this.storage);
    }

}

describe('Model', () => {
    let view: IView;
    let model: MyModel;

    beforeEach(() => {
        view = { setState: (state: any) => null };
        model = new MyModel(view, { prop: 0, str: '' });
    })

    it('UpdateView', () => {
        spyOn(view, 'setState');
        model.incProp();
        expect(view.setState).toHaveBeenCalledWith({ prop: 1 });

        model.setStr('A');
        expect(view.setState).toHaveBeenCalledWith({ prop: 1, str: 'A' });
    });

    it('loadStorage', () => {
        model.incProp();
        model.setStr('B');
        spyOn(view, 'setState');
        model.loadStorage();
        expect(view.setState).toHaveBeenCalledWith({ prop: 1, str: 'B' });
    });
});
