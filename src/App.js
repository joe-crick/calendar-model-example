import React, { Component } from 'react';
import Calendar from './calendar.jsx';
import calendarModelMaker from './models/calendar';
import eventData from './event-data';

// Put React on the window for React tools
if (window !== undefined) {
  window.React = React;
}

class App extends Component {

  constructor (props) {
    super(props);

    // Set the default date of the calendar to today
    const now = new Date();

    this.state = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: 1,
      getMonth: () => []
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);

  }

  componentDidMount() {
     this.setState({
       getMonth: calendarModelMaker(eventData)
    });
  }

  getDate() {
    const state = this.state;
    return `${state.month}/${state.day}/${state.year}`
  }

  nextMonth() {
    this.setState({
      month: this.state.month < 12 ? ++this.state.month : 1
    });
  }
  
  prevMonth() {
    this.setState({
      month: this.state.month > 1 ? --this.state.month : 12
    });
  }
  
  render() {
    const date = this.getDate();
    const monthDays = this.state.getMonth(date);
    return (
      <div className="app-root">
        <Calendar 
          month={this.state.month} 
          year={this.state.year} 
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
          calendarDays={monthDays}/>
      </div>
    );
  }
}

export default App;
