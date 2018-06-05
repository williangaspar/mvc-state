import { Storage } from './Storage';

class MyStorage {
    var1: number = 0;
    var2: string = '';
}

describe('Storage.', () => {
    let storage: Storage<MyStorage>;

    beforeEach(() => {
        storage = new Storage(new MyStorage());
    });

    it('Initial state', () => {
        expect(storage.state.var1).toBe(0);
        expect(storage.state.var2).toBe('');
    });

    it('Propagate changes', () => {
        storage.getWatch('myCtrl')('var1', (var1: any) => {
            expect(var1).toBe(10);
        });

        storage.state.var1 = 10;
    });

    it('Propagate changes across diferent controller', () => {
        let fistCalled = false;
        let secondCalled = false;

        storage.getWatch('myCtrl1')('var1', (var1: any) => {
            fistCalled = true;
        });

        storage.getWatch('myCtrl2')('var1', (var1: any) => {
            secondCalled = true;
        });

        storage.state.var1 = 10;

        expect(fistCalled).toBe(true);
        expect(secondCalled).toBe(true);
    });


    it('Avoid duplicated watcher on same ID', () => {
        const watch = storage.getWatch('myCtrl');
        let fistCalled = false;
        let secondCalled = false;

        watch('var1', (var1: any) => {
            fistCalled = true;
        });

        watch('var1', (var1: any) => {
            secondCalled = true;
        });

        storage.state.var1 = 10;

        expect(fistCalled).toBe(false);
        expect(secondCalled).toBe(true);
    });

    it('unwatch', () => {
        const watch = storage.getWatch('myCtrl');
        const unwatch = storage.getUnwatch('myCtrl');
        let call1 = false;
        let call2 = false;

        watch('var1', (var1: any) => {
            call1 = true;
        });

        watch('var2', (var2: any) => {
            call2 = true;
        });

        const result = unwatch('var2');

        storage.state.var1 = 11;
        storage.state.var2 = 'A';

        expect(result).toBe(true);
        expect(call1).toBe(true);
        expect(call2).toBe(false);
    });

    it('unwatchAll', () => {
        const listener = storage.getListener('ctrl1');
        let call1 = false;
        let call2 = false;

        listener.watch('var1', (var1: any) => {
            call1 = true;
        });

        listener.watch('var2', (var2: any) => {
            call2 = true;
        });

        storage.state.var1 = 1;

        expect(call1).toBe(true);

        call1 = false;

        listener.unwatchAll();

        storage.state.var1 = 2;
        storage.state.var2 = 'A';

        expect(call1).toBe(false);
        expect(call2).toBe(false);
    });

    it('Emit event', () => {
        const watch = storage.getWatch('myCtrl');
        let called = false;

        watch('myEvent', (data: any) => {
            called = data;
        });

        storage.emit('myEvent', true);

        expect(called).toBe(true);
    });
});
