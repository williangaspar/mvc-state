import * as React from "react";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui-icons/Delete';
import CheckIcon from 'material-ui-icons/Check';
import EditIcon from 'material-ui-icons/Edit';
import IconButton from 'material-ui/IconButton';

import * as styles from './TableStyle.css';
import { TodoListStorage } from "../../storage/TodoList";
import { TableCtrl } from './TableCtrl';
import { TableModel, ViewData } from './TableModel';

export class TodoTable extends React.Component {
    public state: ViewData;
    private ctrl: TableCtrl;

    constructor(props: any) {
        super(props);
        const dataModel = new TableModel(this, TodoListStorage.state);
        this.ctrl = new TableCtrl(dataModel, TodoListStorage.getWatch);
        this.state = new ViewData();
    }

    render() {
        return (
            <div>
                <div className={styles.ButtonBar}>
                    <Button raised color="primary" onClick={this.ctrl.onDone}>
                        Done
                        <CheckIcon />
                    </Button>

                    <Button raised color="accent" onClick={this.ctrl.onRemove}>
                        Remove
                        <DeleteIcon />
                    </Button>
                </div>
                <br /><br /><br />
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox onChange={this.ctrl.onSelectAll} />
                                </TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Done</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.todos.map(n => {
                                return (
                                    <TableRow key={n.title}>
                                        <TableCell padding="checkbox"> <Checkbox
                                            checked={this.state.selectedList.findIndex(item => item.title === n.title) > -1}
                                            value={n.title}
                                            onChange={this.ctrl.onRowSelect}
                                        /></TableCell>
                                        <TableCell>{n.title}</TableCell>
                                        <TableCell>{n.done ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="Edit" onClick={() => this.ctrl.onEdit(n.title)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}