import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './calendar.jsx';
import calendarModelMaker from './models/calendar';
import eventData from './event-data';

// Put React on the window for React tools
if (window !== undefined) {
  window.React = React;
}

class App extends Component {

  componentWillMount() {
    this.getMonth = calendarModelMaker(eventData);
    this.year = '2017';
    this.month = '03';
    this.day = '01';
    this.date = `${this.month}/${this.day}/${this.year}`;
    this.calendarDays = this.getMonth(this.date);
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Calendar Model</h2>
        </div>
        <Calendar 
          month={this.month} 
          year={this.year} 
          calendarDays={this.calendarDays}/>
      </div>
    );
  }
}

export default App;
