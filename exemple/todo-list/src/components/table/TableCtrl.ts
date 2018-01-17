import { Controller, GetWatch, Watch } from 'mvc-state';
import { TableModel } from './TableModel';
import { TodoListEvt, Todo } from '../../storage/TodoList';

export class TableCtrl extends Controller {
    private model: TableModel;

    constructor(model: TableModel, getWatch: GetWatch) {
        super();
        this.model = model;
        const watch = this.setIdToWatch(getWatch);

        watch(TodoListEvt.TODOS, (todos: Todo[]) => this.model.add(todos));
    }

    public onEdit = (title: string) => {
        const newTitle = prompt("Edit title", title);
        if (newTitle) {
           this.model.editTitle(title, newTitle);
        }
    }

    public onRowSelect = (event: React.FormEvent<HTMLInputElement>) => {
        this.model.select(event.currentTarget.value);
    }

    public onSelectAll = (event :React.FormEvent<HTMLInputElement>) => {
        this.model.selectAll(event.currentTarget.checked);
    }

    public onDone = () => {
        this.model.setDoneToSelected();
    }

    public onRemove = () => {
        this.model.removeSelected();
    }
}