import React, {Component} from 'react';
import MonthCalendar from './calendar-month';
import WeekCalendar from './calendar-week';
import calendarModelMaker from './models/calendar';
import {getWeekDayNames} from './models/calendar';
import {getNextWeekDay, getPrevWeekDay} from 'calendar-model/lib/week';
import {getNextMonth, getPrevMonth} from 'calendar-model/lib/month';
import eventData from './models/event-data';
import {getDay} from 'calendar-model/lib/day';

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
    const now = getDay({date: new Date()});

    // Set the default state. Calendar model does not maintain state for you, allowing you to determine how
    // you want to manage your own state. In this example, we use React to maintain state. We could have just as
    // easily used Redux or Mobx.
    this.state = {
      year: now.year,
      month: now.month,
      week: now.weekNumber,
      day: 1,
      getMonth: () => [],
      showCalendar: MONTH_CALENDAR
    };

    // Bind the components methods to its current context to ensure appropriate `this` access.
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.prevWeek = this.prevWeek.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  // This is where you set the data for events (presumably some kind of data request). Of course, if you're using
  // Redux, you'd do this differently. The important part is that the calendarModelMaker receives the event data.
  // It uses this data to create an Event Finder, which Calendar Model uses to access event data when it generates
  // the calendar.
  componentDidMount() {
    const calendarModel = calendarModelMaker(eventData);
    this.setState({
      getMonth: calendarModel.getMonth,
      getWeek: calendarModel.getWeek
    });
  }

  // This allows easy, granular setting of date elements: day, month, and year.
  // You can set any of those properties individually, and the date is then obtained
  // by the application when the view renders (ensuring that the state has properly
  // been updated).
  getDate() {
    const state = this.state;
    return `${state.month}/${state.day}/${state.year}`
  }

  nextMonth() {
    this.setState({
      month: getNextMonth(this.getDate())
    });
  }

  prevMonth() {
    this.setState({
      month: getPrevMonth(this.getDate())
    });
  }

  // TODO: Make the Calendar Models observable (Most | Mobx?)

  // Looping through the weeks, we also maintain what month we're in
  // If we loop past the current month, in the the next, we update the month value as well.
  nextWeek() {
    const nextDate = getNextWeekDay(this.getDate());
    const month = nextDate.month;
    this.setState({
      day: nextDate.dayOfMonth,
      month: month !== this.state.month ? month : this.state.month
    });
  }

  prevWeek() {
    const prevDate = getPrevWeekDay(this.getDate());
    const month = prevDate.month;
    this.setState({
      day: prevDate.dayOfMonth,
      month: month !== this.state.month ? month : this.state.month
    });
  }

  toggleCalendar() {
    const isWeekView = this.state.showCalendar === MONTH_CALENDAR;
    this.setState({
      showCalendar: isWeekView ? WEEK_CALENDAR : MONTH_CALENDAR,
      day: isWeekView ? this.state.day : '01'
    });
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
        nextWeek={this.nextWeek}
        prevWeek={this.prevWeek}
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
