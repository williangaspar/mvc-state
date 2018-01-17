import { Model, IView } from 'mvc-state';
import { MyData } from '../../storage/MyData';

export class InputModel extends Model<MyData> {

    public incFoo(value: number) {
        this.storage.foo += value;
        this.updateView({ foo: this.storage.foo });
    }

    public incBar(value: number) {
        this.storage.bar += value;
        this.updateView({ bar: this.storage.bar });
    }
}