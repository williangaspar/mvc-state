import * as React from "react";
import { MyData, MyDataStorage } from "../../storage/MyData";
import { InputCtrl } from "./InputCtrl";
import { InputModel } from "./InputModel";

const style = {
    panel: {
        border: 'solid 1px',
        display: 'inline-flex',
        padding: '5px',
        height: '30px',
        width: '360px'
    },

    displayPanel: {
        display: 'inline-flex',
        paddingLeft: '10px',
        paddingRight: '10px', 
        margin: 'auto'
    },

    button: {
        height: '25px',
        fontSize: '14pt',
        MarginBottom: '-10px'
    },

    display: {
        marginTop: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
    }
};

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
            <div style={style.panel}>
                <span style={style.displayPanel}>
                    <button style={style.button} onClick={this.ctrl.onIncFoo}>+</button>
                    <p style={style.display}>Foo: {this.state.foo}</p>
                    <button style={style.button} onClick={this.ctrl.onDecFoo}>-</button>
                </span>

                <span style={style.displayPanel}>
                    <button style={style.button} onClick={this.ctrl.onIncBar}>+</button>
                    <p style={style.display}>Bar: {this.state.bar}</p>
                    <button style={style.button} onClick={this.ctrl.onDecBar}>-</button>
                </span>
            </div>
        );
    }
}