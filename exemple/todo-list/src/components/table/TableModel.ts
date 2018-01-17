import { Model, IView } from 'mvc-state';
import { TodoList, Todo } from '../../storage/TodoList';

export class ViewData {
    todos: Todo[] = [];
    selectedList: Todo[] = [];
}

export class TableModel extends Model<TodoList> {
    private viewData: ViewData;

    constructor(view: IView, storage: TodoList) {
        super(view, storage);
        this.viewData = new ViewData();
    }

    public add (todos: Todo[]) {
        this.viewData.todos = todos;
        this.updateView({ todos });
    }

    public editTitle(oldTitle: string, newTitle: string) {
        const todos = this.viewData.todos;
        const index = todos.findIndex(item => item.title === oldTitle);
        if (index > -1) {
            todos[index].title = newTitle;
        }
        this.updateView(this.viewData);
    }

    public select(title: string) {
        const index = this.viewData.selectedList.findIndex(item => item.title === title);

        if (index === -1) {
            const todo = this.storage.todos.find(item => item.title === title);
            this.viewData.selectedList.push(todo);
        } else {
            this.viewData.selectedList.splice(index, 1);
        }
        this.updateView(this.viewData);
    }

    public selectAll(checked: boolean) {
        if (checked) {
            this.viewData.selectedList = this.viewData.todos;
        } else {
            this.viewData.selectedList = [];
        }
        this.updateView(this.viewData);
    }

    public setDoneToSelected() {
        let done = false;
        const selectedList = this.viewData.selectedList;

        if (selectedList.length) {
            done = !selectedList[0].done;
        }

        selectedList.forEach((item) => {
            item.done = done;
        });

        this.viewData.selectedList = [];
        this.updateView(this.viewData);
    }

    public removeSelected() {
        const selectedList = this.viewData.selectedList;
        const newList = this.viewData.todos;

        selectedList.forEach((selected) => {
            const index = newList.findIndex(item => item.title === selected.title);

            if (index > -1) {
                newList.splice(index, 1);
            }
        });

        this.viewData.selectedList = [];
        this.updateView(this.viewData);
    }
}