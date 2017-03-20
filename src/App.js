import React, {Component} from 'react';
import MonthCalendar from './calendar-month';
import WeekCalendar from './calendar-week';
import calendarModelMaker from './models/calendar';
import {getWeekDayNames} from './models/calendar';
import {getWeekNumber, getNextWeek, getPrevWeek} from 'calendar-model/lib/week';
import {getNextMonth, getPrevMonth} from 'calendar-model/lib/month';
import eventData from './models/event-data';

// Put React on the window for React tools
if (window !== undefined) {
  window.React = React;
}

const MONTH_CALENDAR = 'month';
const WEEK_CALENDAR = 'week';
const weekdayNames = getWeekDayNames();

class App extends Component {

  constructor(props) {
    super(props);

    // Set the default date of the calendar to today
    const now = new Date();

    this.state = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      week: getWeekNumber(now),
      day: 1,
      getMonth: () => [],
      showCalendar: MONTH_CALENDAR
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.prevWeek = this.prevWeek.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  componentDidMount() {
    const calendarModel = calendarModelMaker(eventData);
    this.setState({
      getMonth: calendarModel.getMonth,
      getWeek: calendarModel.getWeek
    });
  }

  getDate() {
    const state = this.state;
    return `${state.month}/${state.day}/${state.year}`
  }

  nextMonth() {
    this.setState({
      month: getNextMonth(this.state.month)
    });
  }

  prevMonth() {
    this.setState({
      month: getPrevMonth(this.state.month)
    });
  }

  nextWeek() {
    this.setState({
      week: getNextWeek(this.state.week)
    });
  }

  prevWeek() {
    this.setState({
      week: getPrevWeek(this.state.week)
    });
  }

  toggleCalendar() {
    this.setState({
      showCalendar: this.state.showCalendar === MONTH_CALENDAR ? WEEK_CALENDAR : MONTH_CALENDAR
    })
  }

  showMonth(monthDays) {
    return (
      <MonthCalendar
        month={this.state.month}
        year={this.state.year}
        nextMonth={this.nextMonth}
        prevMonth={this.prevMonth}
        weekdayNames={weekdayNames}
        calendarDays={monthDays}/>
    )
  }

  showWeek(weekDays) {
    return (
      <WeekCalendar
        month={this.state.month}
        year={this.state.year}
        nextWeek={this.nextMonth}
        prevWeek={this.prevMonth}
        weekdayNames={weekdayNames}
        calendarDays={weekDays}/>
    )
  }

  render() {
    const date = this.getDate();
    return (
      <div className="app-root">
        <div>
          <button onClick={this.toggleCalendar}>Toggle Calendar</button>
        </div>
        {this.state.showCalendar === MONTH_CALENDAR && this.showMonth(this.state.getMonth(date))}
        {this.state.showCalendar === WEEK_CALENDAR && this.showWeek(this.state.getWeek(date))}
      </div>
    );
  }
}

export default App;
