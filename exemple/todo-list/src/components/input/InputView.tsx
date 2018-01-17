import * as React from "react";
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { InputModel, ViewData } from './InputModel';
import { InputCtrl } from './InputCtrl';
import { TodoListStorage } from "../../storage/TodoList";

export class Input extends React.Component {
    public state: ViewData;
    private ctrl: InputCtrl;

    constructor(props: any) {
        super(props);
        const dataModule = new InputModel(this, TodoListStorage.state);
        this.ctrl = new InputCtrl(dataModule);
        this.state = { title: '' };
    }

    render() {
        return (
            <div onSubmit={this.ctrl.onAdd.bind(null, this.state.title)}>
                <form noValidate>
                    <TextField
                        fullWidth
                        id="title"
                        label="Title"
                        value={this.state.title}
                        onChange={this.ctrl.onChange}
                    />
                </form>

            </div>
        );
    }
}