import React, { Component } from 'react';

class NodeChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          NodeId: this.props.info.node,
          date: this.props.info.date,
          data: []
        }
        
    }

    getData(){
        let url = 'http://airsense.vn:4000/airsense/Data7day?NodeId='+this.state.NodeId
        fetch(url)
        .then(res => res.json())
        .then(data => {
            let array = []
            for(let i = 0; i<24; i++){
                array[i] = "inactive-block"
            }
            
            if(data.length){
                this.state.date.setHours(0)
                this.state.date.setMinutes(0)
                this.state.date.setSeconds(0)
                let timeStamp = this.props.info.date.getTime()/1000
                data.forEach(record => {
                    let hour = Math.floor((record.Time - timeStamp)/3600)
                    if(hour>=0 && hour <24){
                        array[hour] = "active-block"
                    }
                })
            }
            this.setState({data: array})
        })
    }
    componentDidMount(){
        this.getData()
    }
    componentDidUpdate(prevProps){
        if(this.props !== prevProps) {
            this.getData()
        }
    }
    render() {
        return (
            <div class="row-chart"> 
                <div class="label">
                    <div>{this.state.NodeId}</div>
                </div>
                {this.state.data.map((value, index) => {
                    return(
                        <div class={value + " block"}></div>
                    );
                })}
            </div>

        );
      }
}

export default NodeChart;