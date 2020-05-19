import React, { Component } from 'react';
import './App.css';
import Table from './Component/Table';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Component/NavBar';
import Chart from './Component/Chart';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      class:"all",
      date: new Date(),
      activeNumber: 0,
      activeBeforeNumber: 0,
      inactive: 0
    }
  }


  componentDidMount() {
    fetch('http://airsense.vn:4000/airsense/devices')
      .then(res => res.json())
      .then(nodes => {
        this.state.nodes = nodes
        this.getData(nodes)
    })
  }

  getData(nodes) {
    nodes.forEach(node => {
      let url = 'http://airsense.vn:4000/airsense/Data7day?NodeId='+node.NodeId
      fetch(url)
      .then(res => res.json())
      .then(data => {
        if(data.length){
          let recentRecord = data[0]
          node.PM10 = recentRecord.PM10
          node.PM2_5 = recentRecord['PM2.5']
          node.Time = recentRecord.Time
          node.Hum = recentRecord.Hum
          let now = new Date().getTime() / 1000
          node.timeDelta = ((now - node.Time) - (now - node.Time) % 3600)/3600
          if(node.timeDelta === 0) {
            node.Status = "Active"
            node.Class = "active"
            this.state.activeNumber++
          } else {
            if(node.timeDelta>24){
              node.timeDelta = (node.timeDelta - node.timeDelta%24)/24
              node.Status = "Active "+node.timeDelta+" days ago"
            } else node.Status = "Active "+node.timeDelta+" hours ago"
            node.Class = "active-before"
            this.state.activeBeforeNumber++
          }
        } else {
          node.Status = "Inactive"
          node.Class = "inactive"
          this.state.inactive++
        }
        this.setState({ 'nodes': nodes })
      })
    });
  } 


  selectStatusCallBack = (selectedValue) => {
    this.setState({ class: selectedValue });
  }

  setChangeDateCallBack = (selectDate) => {
    this.setState({date: selectDate});
  }


  render() {
    return (
      <div className="App">
        <NavBar selectStatusCallBack={this.selectStatusCallBack}/>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Home" label="Home">
            <Table props = {this.state}/>
          </Tab>
          <Tab eventKey="chart" title="Chart" label="Chart">
            <Chart nodes = {this.state.nodes}/>
          </Tab>
        </Tabs>
        {/* <NavBar selectStatusCallBack={this.selectStatusCallBack}/>
        <Table props= {this.state}/> */}
      </div>
    );
  }
}

export default App;
