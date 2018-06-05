
# MVC State

## TODO
* update exemple's folder and readme

## The MVC patter
There is many definitions of whats is MVC out there, here is the one we are following:

![MVC](mvc.png)

## Storage

A storage is a way of sharing data.

```javascript
import { Storage } from 'mvc-state';

export class MyData {
    foo: number = 0;
    bar: number = 0;
}

export enum MyDataEvt {
    FOO = 'foo',
    BAR = 'bar'
}

export const MyDataStorage = new Storage<MyData>(new MyData());
```

We start by creating a class with all data we want to share, called, `MyData` is this exemple. Don't forget to give a initial value to EVERY property.
Next you have an event `enum`. Later on you will see that MVC-State uses watchers to capture changes in the data storage. `MyDataEvt` will be responsible for provide you with the right events to listem.

## Model

Models holds all the businness logic of your application.

```javascript
import { Model, IView } from 'mvc-state';
import { MyData } from '../../storage/MyData';

export class InputModel extends Model<MyData> {

    constructor(view: IView, storage: MyData) {
        super(view, storage);
    }

    public incFoo(value: number) {
        this.storage.foo += value;
        this.updateView({ foo: this.storage.foo });
    }
}
```

By default a model's constructor takes 2 parameter:
* `view` - That's the object you need to call when you want to update the view layer.
* `storage` - That's the object you call when you want to update the shared storage.

The `IntFoo` function shows the basic usage of these 2 objects. When `this.storage.foo` is set, a event
is send out to every watcher listening to the `MyDataEvt.FOO` event. And `this.updateView` works like the
`setState` used by React.

Be aware that the view will only be updated when you call `updateView`.

## Controller

Controllers are responsible for listening to the view, storage events and talk to the model.

```javascript
import { Controller, GetWatch, Watch } from 'mvc-state';
import { InputModel } from './InputModel';

export class InputCtrl extends Controller {
    private model: InputModel;

    constructor(model: InputModel) {
        super();
        this.model = model;
    }

    public onIncBar = () => {
        this.model.incBar(1);
    }

    public onDecBar = () => {
        this.model.incBar(-1);
    }
}

export class ChartCtrl extends Controller {
    private model: ChartModel;

    constructor(model: ChartModel, getWatch: GetWatch) {
        super();
        this.model = model;

        //Just getting a unique id. you can set your own id by calling: getWatch('myId');
        const watch = this.setIdToWatch(getWatch);

        watch(MyDataEvt.FOO, (foo: number) => this.model.calcFoo(foo));
        watch(MyDataEvt.BAR, (bar: number) => this.model.calcBar(bar));
    };
}

```

Above we have two of them. The first one is just expecting the view to call one of it's function so it can
talk to the model. The second one is listenning to some events. the `watch` function will be triggerd every
time someone sets a new value to a storage. (`this.storage.FOO = bar`)

## View

The view is the presentation layer.

```jsx
import * as React from "react";
import { MyData, MyDataStorage } from "../../storage/MyData";
import { InputCtrl } from "./InputCtrl";
import { InputModel } from "./InputModel";

export class Input extends React.Component {
    public state: MyData;
    private ctrl: InputCtrl;

    constructor(props: any) {
        super(props);
        const dataModule = new InputModel(this, MyDataStorage.state);
        this.ctrl = new InputCtrl(dataModule);
        this.state = new MyData();
    }

    render() {
        return (
            <div >
                <span >
                    <button onClick={this.ctrl.onIncBar}>+</button>
                    <p>Bar: {this.state.bar}</p>
                    <button onClick={this.ctrl.onDecBar}>-</button>
                </span>
            </div>
        );
    }
}
```

Not much to say here. It is just react. Every time you call `viewUpdate` in a model, the state will be updated, any event should be handled by the controller.
