import * as React from "react";
import { Input } from './../input/InputView';
import { Chart } from './../chart/ChartView';

const style = {
    border: 'solid 1px',
    width: '370px',
    height: '430px',
    margin: 'auto',
    marginTop: '30px',
    padding: '20px',
};

export class Main extends React.Component {

    render() {
        return (
            <div style={style}>
                <Chart />
                <Input />
            </div>
        );
    }
}