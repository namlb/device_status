import React, { Component } from 'react';
import logo from '../airsense.png';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        console.log("value: ", event.target.value)
        this.props.selectStatusCallBack(event.target.value)
    }
    render(){
        return (
            <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="./">
              <img src={logo} alt="logo" width="200" />
            </a>
            <div class="form-group">
              <select class="form-control" id="selectedStatus" onChange={this.handleChange}>
                <option value="all" selected="selected">All</option>
                <option value="active">Active</option>
                <option value="active-before">Active before</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </nav>
        );
    }
  }
  
  export default NavBar