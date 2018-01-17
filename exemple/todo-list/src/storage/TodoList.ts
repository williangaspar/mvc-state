import { Storage } from 'mvc-state';

export interface Todo {
    title: string;
    done: boolean;
}

export class TodoList {
    todos: Todo[] = [];
}

export enum TodoListEvt {
    TODOS = 'todos',
}

export const TodoListStorage = new Storage<TodoList>(new TodoList());