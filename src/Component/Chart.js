import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NodeChart from './NodeChart';
import Mark from './Mark';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: this.props.nodes,
            date: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = date => {
        this.setState({date: date})
        console.log("this.state.date: ", this.state.date)
    };
    render() {
        console.log("render Chart")
        return (
            <div>
                <div class="date-picker">
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChange}
                    />
                </div>
                <div class="contain">
                    <Mark />
                    {this.props.nodes.length > 0 ? this.props.nodes.map((node, index) => {
                        let info = {
                            node: node.NodeId,
                            date: this.state.date
                        }
                        return(
                            <NodeChart info = {info}/>
                        );
                    }): <div>loading ...</div>}
                </div>
            </div>
        );
    }
}


export default Chart;