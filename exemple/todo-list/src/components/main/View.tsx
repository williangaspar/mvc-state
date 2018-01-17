import * as React from "react";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Input } from '../input/InputView';
import { TodoTable } from "../table/TableView";
import * as styles from './Style.css';

export class Main extends React.Component {

    render() {
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="title" color="inherit" >
                            Todo-list with react, typescript, material-ui and mvc-state!
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={styles.Content}>
                    <Input />
                    <br />
                    <TodoTable />
                </div>
            </div>
        );
    }
}