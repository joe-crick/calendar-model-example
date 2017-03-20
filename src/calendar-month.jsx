import React from 'react';
import './calendar.css';
import {getCalendarTitle} from './models/calendar';

function getAdjustedMonth(month) {
  return (month >> 0) - 1;
}

function getDayClassName(day, month) {
  return `day ${(day.date.getMonth() === getAdjustedMonth(month)) ? 'current' : 'outside'}`
}

const {array, number} = React.PropTypes;

const MonthCalendar = props => {

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="container">
          <div className="row">
            <div className="col">
              <button className="cal-nav btn btn-primary right" onClick={props.prevMonth}>Prev</button>
            </div>
            <div className="col">
              <h1 className="month-title">{getCalendarTitle(props.month, props.year)}</h1>
            </div>
            <div className="col">
              <button className="cal-nav btn btn-primary" onClick={props.nextMonth}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <table className="calendar-example">
        <thead>
        <tr>
          {props.weekdayNames.map((dayName, idx) => <th key={idx}>{dayName}</th>)}
        </tr>
        </thead>
        <tbody>
        {props.calendarDays.map((week, index) => {
          return (
            <tr key={index} className="week">
              {week.map((day, idx) => {
                return (
                  <td key={idx} className={getDayClassName(day, props.month)}>
                    <div className="day-contents">
                      <h3>{day.dayOfMonth}</h3>
                      <ul className="events">
                        {day.events.map((ev, idx) => {
                          return (
                            <li key={idx}>
                              {ev.time}: {ev.title}
                            </li>
                          )
                        })}
                      </ul>
                    </div >
                  </td>);
              })}
            </tr>);
        })}
        </tbody>
      </table>
    </div>
  );
};

MonthCalendar.propTypes = {
  month: number,
  year: number,
  calendarDays: array,
  weekdayNames: array
};

export default MonthCalendar;