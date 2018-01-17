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