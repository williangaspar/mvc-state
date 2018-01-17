import * as React from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";
import { MyDataStorage } from "../../storage/MyData";
import {ChartCtrl} from './ChartController';
import {ChartModel, ViewData} from './ChartModel';

const style = {
    border: 'solid 1px',
    width: '350px',
    height: '350px',
    marginBottom: '10px',
    padding: '10px'
};

export class Chart extends React.Component {
    public state: ViewData;
    public ctrl: ChartCtrl;

    constructor(props: any) {
        super(props);
        const dataModule = new ChartModel(this, MyDataStorage.state);
        this.ctrl = new ChartCtrl(dataModule, MyDataStorage.getWatch);
        this.state = new ViewData();
    }

    render() {
        return (
            <div style={style}>
                <BarChart width={350} height={320} data={this.state.data}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="foo" fill="#8884d8" />
                    <Bar dataKey="bar" fill="#82ca9d" />
                </BarChart>
            </div>
        );
    }
}