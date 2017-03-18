import React, { Component } from 'react';
import Calendar from './calendar.jsx';
import calendarModelMaker from './models/calendar';
import eventData from './event-data';

// Put React on the window for React tools
if (window !== undefined) {
  window.React = React;
}

function getDate() {
  return `${this.month}/${this.day}/${this.year}`
}

class App extends Component {

  constructor (props) {
    super(props);

    const now = new Date();

    this.state = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: 1,
      getMonth: () => []
    };
    this.nextMonth = this.nextMonth.bind(this);

  }

  componentDidMount() {
     this.setState({
       getMonth: calendarModelMaker(eventData)
    });
  }

  nextMonth() {
    this.setState({
      month: ++this.state.month
    })
  }
  
  render() {
    const date = getDate.call(this.state);
    const monthDays = this.state.getMonth(date);
    return (
      <div className="app-root">
        <Calendar 
          month={this.state.month} 
          year={this.state.year} 
          nextMonth={this.nextMonth}
          calendarDays={monthDays}/>
      </div>
    );
  }
}

export default App;
