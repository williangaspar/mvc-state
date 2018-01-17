import { Model, IView } from 'mvc-state';
import { TodoList, Todo } from '../../storage/TodoList';

export class ViewData {
    title: string = '';
}

export class InputModel extends Model<TodoList> {

    public add(title: string) {
        const todoList = this.storage.todos;
        if (!todoList.find(item => title === item.title)) {
            todoList.push({ title, done: false });
            this.storage.todos = todoList;
        };
        this.updateView({ title: '' });
    }
}