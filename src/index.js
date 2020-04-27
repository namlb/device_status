import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <Route path="/device_status" component={App} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
