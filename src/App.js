import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './calendar.jsx';
import calendarModelMaker from '../models/calendar';
import eventData from './event-data';

// Put React on the window for React tools
if (window !== undefined) {
  window.React = React;
}

class App extends Component {

  componentWillMount() {
    this.getMonth = calendarModelMaker(eventData);
    this.month = this.getMonth('/01/03/2017');
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Calendar Model</h2>
        </div>
        <Calendar month={this.month}/>
      </div>
    );
  }
}

export default App;
